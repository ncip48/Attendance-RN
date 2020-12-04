import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {useMutation} from 'react-query';
import {Snackbar} from 'react-native-paper';
import {Text, Card, Button, TextInput} from '../../components';
import {UserContext} from '../../context/userContext';
import {API, setAuthToken} from '../../config/api';
import color from '../../utils/color';

export const Login = (props) => {
  const [state, dispatch] = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = await AsyncStorage.getItem('token');
    setAuthToken(token);
    try {
      const res = await API.get('/auth');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data.data.worker,
      });
      //alert(res);
      props.navigation.navigate('Home');
    } catch (err) {
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  const [loginAction, {isLoading, error}] = useMutation(async (values) => {
    const body = values;
    try {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const res = await API.post('/login', body, config);
        await AsyncStorage.setItem('token', res.data.data.token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data.data,
        });
        setAuthToken(res.data.data.token);
        try {
          const res = await API.get('/auth');
          dispatch({
            type: 'USER_LOADED',
            payload: res.data.data.worker,
          });
        } catch (err) {
          dispatch({
            type: 'AUTH_ERROR',
          });
        }
        props.navigation.navigate('Home');
      } catch (err) {
        // onToggleSnackBar();
        dispatch({
          type: 'LOGIN_FAILED',
        });
        setErrorMsg(err.response.data.error.message);
      }
    } catch (err) {
      // onToggleSnackBar();
      console.log(err);
      setErrorMsg(err.message);
    }
  });

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <Text
          type="bold"
          color="darkgray"
          size={24}
          text="Login"
          style={{
            marginBottom: ResponsiveScreen.normalize(20),
          }}
        />
        <Text
          type="regular"
          color="darkgray"
          size={12}
          text="Masukkan NRP dan Password anda, Jika lupa tanyakan kepada administrator"
          style={{
            marginBottom: ResponsiveScreen.normalize(60),
            width: ResponsiveScreen.normalize(253),
            textAlign: 'center',
          }}
        />
        <Card border={10} style={{width: ResponsiveScreen.normalize(335)}}>
          <Formik
            initialValues={{nrp: '', password: ''}}
            onSubmit={(values) => {
              loginAction(values);
            }}>
            {({values, handleChange, handleSubmit}) => (
              <>
                <TextInput
                  placeholder="Masukkan NRP"
                  value={values.nrp}
                  onChangeText={handleChange('nrp')}
                />
                <TextInput
                  placeholder="Masukkan Password"
                  secureTextEntry
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                <Button
                  rounded
                  bgColor="red"
                  height={40}
                  width={300}
                  text="Continue"
                  textType="bold"
                  textColor="white"
                  textSize={12}
                  style={{marginTop: ResponsiveScreen.normalize(25)}}
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
        </Card>
      </View>
      <Snackbar visible={error || errorMsg}>
        {error ? error.message : null}
        {errorMsg ? errorMsg : null}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ResponsiveScreen.normalize(20),
    backgroundColor: color.grey,
  },
});

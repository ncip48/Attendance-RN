import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  Platform,
  ToastAndroid,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import color from '../../utils/color';
import {CardMenu, CardMenuBottom} from '../../components';
import {UserContext} from '../../context/userContext';

export const Home = (props) => {
  const [state] = useContext(UserContext);
  const message = 'tap back again to exit the App';
  const [exitApp, setExitApp] = useState(0);
  const route = useRoute();

  const backAction = () => {
    if (route.name === 'Home') {
      // setTimeout(() => {
      //   setExitApp(0);
      // }, 2000); // 2 seconds to tap second-time

      // if (exitApp === 0) {
      //   setExitApp(exitApp + 1);

      //   ToastAndroid.show(message, ToastAndroid.SHORT);
      // } else if (exitApp === 1) {
      //   BackHandler.exitApp();
      // }
      return true;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={color.red}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <CardMenu profile={state.user} />
        <CardMenuBottom id={state.user.id} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: color.greysoft,
  },
});

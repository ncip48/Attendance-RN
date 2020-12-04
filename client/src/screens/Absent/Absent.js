import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, BackHandler} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import SegmentedControl from '@react-native-community/segmented-control';
import moment from 'moment';
import {useMutation} from 'react-query';
import {CardLocation} from '../../components';
import color from '../../utils/color';
import {API} from '../../config/api';

export const Absent = (props) => {
  const [type, setType] = useState(0);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
  //     props.navigation.goBack(),
  //   );
  //   return () => backHandler.remove();
  // });

  const [attendanceAction, {isLoading, error}] = useMutation(async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      id_pegawai_absen: user.id_pegawai,
      masuk_absen: moment().format('Y-M-D H:m:s'),
      masuk_absen_foto: photo,
      masuk_absen_status: type === 0 ? 1 : null,
      pulang_absen_status: type === 1 ? 1 : 0,
      long_absen: currentLongitude,
      lat_absen: currentLatitude,
    };

    const body2 = {
      id_pegawai_absen: user.id_pegawai,
      masuk_absen: moment().format('Y-M-D H:m:s'),
      pulang_absen: moment().format('Y-M-D H:m:s'),
      pulang_absen_foto: photo,
      pulang_absen_status: type === 1 ? 1 : 0,
    };
    const res =
      type === 0
        ? await API.post('/absen', body, config)
        : await API.patch('/absen', body2, config);
    console.log(res.data);

    //await AsyncStorage.setItem('user', JSON.stringify(res.data.data.user));
    //props.navigation.navigate('Home');
  });

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'light-content'} />
      <Header
        centerComponent={{
          text: moment().format('DD MMMM Y'),
          style: {
            fontFamily: 'SFPro-SemiBold',
            color: color.white,
            fontSize: 16,
          },
        }}
        leftComponent={{
          icon: 'chevron-left',
          type: 'material-community',
          color: color.white,
          size: 30,
          onPress: () => props.navigation.goBack(),
        }}
        containerStyle={{
          backgroundColor: color.red,
          borderBottomWidth: 0,
        }}
      />
      <View style={styles.container}>
        <CardLocation />
        {/* <View
          style={{
            backgroundColor: color.white,
            flex: 2,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}> */}
        {/* <View style={styles.upper}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'SFPro-Regular',
                color: color.red,
              }}>
              {warnJarak}
            </Text>
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16,
                textAlign: 'center',
              }}>
              {address}
            </Text>
            <SegmentedControl
              values={['Masuk', 'Pulang']}
              selectedIndex={type}
              onChange={(event) => {
                setType(event.nativeEvent.selectedSegmentIndex);
              }}
              style={{
                backgroundColor: color.white,
                marginVertical: 20,
                height: 40,
              }}
              tintColor={color.primary}
              fontStyle={{
                color: color.black,
              }}
              activeFontStyle={{
                color: color.white,
              }}
            />
            <Text style={{textAlign: 'center', marginBottom: 10}}>Gambar</Text>
            {photo === null ? (
              <Icon
                type="material-community"
                name="plus"
                color="grey"
                size={50}
                iconStyle={{
                  borderWidth: 2,
                  borderColor: 'grey',
                  borderRadius: 10,
                  padding: 10,
                }}
                onPress={() => props.navigation.navigate('Camera')}
              />
            ) : (
              <Image
                source={{uri: photo}}
                style={{
                  width: 120,
                  height: 180,
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              />
            )}
          </View>
          <View style={styles.footer}>
            <Button
              disabled={warnJarak}
              onPress={attendanceAction}
              bgColor={color.primary}
              color={color.white}
              height={50}
              width={width / 2}
              rounded
              text="Absen"
            />
          </View> */}
        {/* </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.greysoft,
    padding: 0,
  },
});

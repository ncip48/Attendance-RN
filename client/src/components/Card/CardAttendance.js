import React, {useContext} from 'react';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {Card, Text, Button} from '../../components/';
import {Icon} from 'react-native-elements';
import {useRoute} from '@react-navigation/native';
import {View, Image} from 'react-native';
import moment from 'moment';
import color from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../context/userContext';

export const CardAttendance = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [state] = useContext(UserContext);

  return (
    <Card
      border={10}
      clear
      style={{
        height: ResponsiveScreen.normalize(440),
        width: ResponsiveScreen.normalize(301),
        marginTop: ResponsiveScreen.normalize(30),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        type="feather"
        name="check-circle"
        size={ResponsiveScreen.normalize(75)}
        color={color.red}
      />
      <Text
        type="semibold"
        color="darkgray"
        size={16}
        text="Absen Sukses"
        style={{
          textAlign: 'center',
          marginTop: ResponsiveScreen.normalize(15),
        }}
      />
      <Text
        type="light"
        color="darkgray"
        size={14}
        text={
          route.params.type === 1
            ? 'Anda pulang pada pukul'
            : 'Anda masuk pada pukul'
        }
        style={{
          textAlign: 'center',
          marginTop: ResponsiveScreen.normalize(33),
        }}
      />
      <Text
        type="bold"
        color="red"
        size={64}
        text={route.params.timestamp.time}
        style={{
          textAlign: 'center',
          lineHeight: 78,
        }}
      />
      <Text
        type="semibold"
        color="red"
        size={16}
        text={
          'Berhasil absen pada tanggal ' +
          moment(route.params.timestamp.date).format('DD MMMM')
        }
        style={{
          textAlign: 'center',
          marginTop: ResponsiveScreen.normalize(5),
          marginBottom: ResponsiveScreen.normalize(36),
        }}
      />
      <Button
        rounded
        bgColor="red"
        height={40}
        width={150}
        text="Done"
        textType="bold"
        textColor="white"
        textSize={12}
        onPress={
          () => navigation.navigate('Home')
          //   alert(JSON.stringify(result))
        }
      />
    </Card>
  );
};

import React, {useContext} from 'react';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {Card, Text, Button} from '../../components/';
import {useRoute} from '@react-navigation/native';
import {View, Image} from 'react-native';
import moment from 'moment';
import color from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../context/userContext';

export const CardCameraDetail = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [state] = useContext(UserContext);

  const result = {
    location: route.params.location,
    type: route.params.type[0],
    photo: route.params.photo,
    user: state.user,
    timestamp: {
      date: moment().format('YYYY-MM-DD'),
      time: moment().format('H:m'),
    },
  };

  return (
    <Card
      border={10}
      clear
      style={{
        height: ResponsiveScreen.normalize(440),
        width: ResponsiveScreen.normalize(301),
        marginTop: ResponsiveScreen.normalize(30),
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: ResponsiveScreen.normalize(250),
          width: ResponsiveScreen.normalize(250),
          marginTop: ResponsiveScreen.normalize(20),
          borderRadius: ResponsiveScreen.normalize(20),
          overflow: 'hidden',
        }}>
        <Image
          source={{uri: route.params.photo}}
          style={{
            height: ResponsiveScreen.normalize(250),
            width: ResponsiveScreen.normalize(250),
            borderRadius: ResponsiveScreen.normalize(20),
            alignItems: 'center',
            alignSelf: 'center',
          }}
        />
      </View>
      <Text
        type="semibold"
        color="black"
        size={16}
        text="Ulangi Foto"
        style={{
          marginTop: ResponsiveScreen.normalize(27),
          marginHorizontal: ResponsiveScreen.normalize(25),
          textAlign: 'center',
        }}
        onPress={() => navigation.navigate('Camera')}
      />
      <Button
        rounded
        bgColor="red"
        height={40}
        width={150}
        text="Absen"
        textType="bold"
        textColor="white"
        textSize={12}
        onPress={
          () =>
            navigation.navigate('AbsentDone', {
              timestamp: result.timestamp,
              type: result.type,
            })
          // console.log(result)
        }
        style={{
          position: 'absolute',
          bottom: ResponsiveScreen.normalize(30),
        }}
      />
    </Card>
  );
};

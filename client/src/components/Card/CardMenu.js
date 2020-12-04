import React from 'react';
import {View, StatusBar} from 'react-native';
import {Icon, Avatar} from 'react-native-elements';
import {Card} from './Card';
import {Text} from '../Text';
import {Button} from '../Button';
import color from '../../utils/color';
import moment from 'moment';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import Dash from 'react-native-dash';
import {useNavigation} from '@react-navigation/native';

export const CardMenu = (props) => {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          paddingBottom: 0,
          backgroundColor: color.red,
          marginBottom: 0,
          borderBottomLeftRadius: ResponsiveScreen.normalize(40),
          borderBottomRightRadius: ResponsiveScreen.normalize(40),
          height: ResponsiveScreen.normalize(230),
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: ResponsiveScreen.normalize(120 - StatusBar.currentHeight),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: ResponsiveScreen.normalize(38),
            alignItems: 'center',
            marginTop: ResponsiveScreen.normalize(StatusBar.currentHeight),
          }}>
          <View>
            <Text
              type="light"
              color="white"
              size={20}
              text="CV. Devya Teknologi"
            />
            <Text type="bold" color="white" size={20} text="Selamat Sore" />
          </View>
          <Icon
            type="material-community"
            name="bell"
            color={color.white}
            size={ResponsiveScreen.normalize(24)}
          />
        </View>
        <View style={{height: ResponsiveScreen.normalize(110)}}></View>
      </View>
      <Card
        border={10}
        clear
        style={{
          height: ResponsiveScreen.normalize(220),
          width: ResponsiveScreen.normalize(300),
          marginTop: -ResponsiveScreen.normalize(110),
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: ResponsiveScreen.normalize(110),
          }}>
          <Avatar
            size="large"
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            }}
            title={props.profile.firstName[0]}
            avatarStyle={{
              height: ResponsiveScreen.normalize(70),
              width: ResponsiveScreen.normalize(70),
            }}
            containerStyle={{
              height: ResponsiveScreen.normalize(70),
              width: ResponsiveScreen.normalize(70),
            }}
          />
          <View style={{flexDirection: 'column'}}>
            <Text
              color={color.red}
              type="bold"
              size={12}
              text={props.profile.position.name}
              style={{
                borderWidth: 2,
                borderColor: color.red,
                height: ResponsiveScreen.normalize(25),
                padding: ResponsiveScreen.normalize(5),
                paddingHorizontal: ResponsiveScreen.normalize(15),
                borderRadius: ResponsiveScreen.normalize(20),
                marginLeft: ResponsiveScreen.normalize(14),
              }}
            />
            <Text
              color={color.black}
              type="bold"
              size={14}
              text={props.profile.firstName + ' ' + props.profile.lastName}
              style={{
                marginTop: ResponsiveScreen.normalize(7),
                marginLeft: ResponsiveScreen.normalize(15),
              }}
            />
            <Text
              color={color.darkgray}
              type="light"
              size={14}
              text={moment().format('dddd, DD MMMM')}
              style={{
                marginTop: ResponsiveScreen.normalize(5),
                marginLeft: ResponsiveScreen.normalize(15),
              }}
            />
          </View>
        </View>
        <Dash
          style={{width: ResponsiveScreen.normalize(300), height: 1}}
          dashColor="#A5A5A5"
          dashGap={5}
          dashLength={10}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: ResponsiveScreen.normalize(110),
          }}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text color="darkgray" size={14} text="Hadir" />
            <Text type="bold" color="red" size={16} text="12" />
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <Text color="darkgray" size={14} text="Izin" />
            <Text type="bold" color="blue" size={16} text="0" />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Button
              rounded
              bgColor="red"
              height={40}
              width={150}
              text="Absen Sekarang"
              textType="bold"
              textColor="white"
              textSize={12}
              onPress={() => navigation.navigate('Absent')}
              style={{marginBottom: ResponsiveScreen.normalize(10)}}
            />
            <Button
              rounded
              border
              bgColor="white"
              height={40}
              width={150}
              text="Ajukan Izin"
              textType="bold"
              textColor="red"
              textSize={12}
              onPress={() => navigation.navigate('Absent')}
            />
          </View>
        </View>
      </Card>
    </View>
  );
};

import React from 'react';
import {View, Image, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {Card} from './Card';
import {Text} from '../Text';
import {Button} from '../Button';
import color from '../../utils/color';
import moment from 'moment';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const list = [
  {
    date: '2020-11-30',
    in: '08:00',
    out: '16:00',
  },
  {
    date: '2020-12-01',
    in: '08:05',
    out: '16:05',
  },
  {
    date: '2020-12-02',
    in: '07:55',
    out: '15:55',
  },
  {
    date: '2020-12-03',
    in: '08:00',
    out: '16:00',
  },
];

export const CardMenuBottom = (props) => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <ListItem key={index} containerStyle={{justifyContent: 'center'}}>
        <Text
          type="bold"
          color="black"
          size={14}
          text={moment(item.date).format('DD MMM Y')}
        />
        <Text type="light" color="black" size={14} text={'In : ' + item.in} />
        <Text type="light" color="black" size={14} text={'Out : ' + item.out} />
      </ListItem>
    );
  };

  return (
    <View>
      <View
        style={{
          paddingBottom: 0,
          backgroundColor: color.greysoft,
          marginBottom: 0,
          height: ResponsiveScreen.normalize(470),
        }}>
        <View
          style={{
            marginTop: ResponsiveScreen.normalize(35),
            marginHorizontal: ResponsiveScreen.normalize(21),
          }}>
          <Text type="bold" size={18} text="Panduan" />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Card
              border={10}
              clear
              style={{
                height: ResponsiveScreen.normalize(100),
                width: ResponsiveScreen.normalize(150),
                marginTop: ResponsiveScreen.normalize(15),
              }}>
              <View style={{height: ResponsiveScreen.normalize(60)}}>
                <Image
                  source={require('../../assets/img/selfi.png')}
                  resizeMode="contain"
                  style={{
                    height: ResponsiveScreen.normalize(60),
                    width: ResponsiveScreen.normalize(150),
                    borderTopLeftRadius: ResponsiveScreen.normalize(10),
                    borderTopRightRadius: ResponsiveScreen.normalize(10),
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: ResponsiveScreen.normalize(40),
                }}>
                <Text
                  type="semibold"
                  size={14}
                  text="Bagaimana Cara Selfi"
                  style={{textAlign: 'center'}}
                />
              </View>
            </Card>
            <Card
              border={10}
              clear
              style={{
                height: ResponsiveScreen.normalize(100),
                width: ResponsiveScreen.normalize(150),
                marginTop: ResponsiveScreen.normalize(16),
              }}>
              <View style={{height: ResponsiveScreen.normalize(60)}}>
                <Image
                  source={require('../../assets/img/work.png')}
                  resizeMode="contain"
                  style={{
                    height: ResponsiveScreen.normalize(60),
                    width: ResponsiveScreen.normalize(150),
                    borderTopLeftRadius: ResponsiveScreen.normalize(10),
                    borderTopRightRadius: ResponsiveScreen.normalize(10),
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: ResponsiveScreen.normalize(40),
                }}>
                <Text
                  type="semibold"
                  size={14}
                  text="Cara Menggunakan App"
                  style={{textAlign: 'center'}}
                />
              </View>
            </Card>
          </View>
        </View>
        <View
          style={{
            marginTop: ResponsiveScreen.normalize(35),
            marginHorizontal: ResponsiveScreen.normalize(21),
          }}>
          <Text type="bold" size={18} text="Absensi" />
          <Card
            border={10}
            clear
            style={{
              height: ResponsiveScreen.normalize(230),
              width: ResponsiveScreen.normalize(300),
              marginTop: ResponsiveScreen.normalize(15),
              alignSelf: 'center',
            }}>
            <FlatList
              data={list}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(list, index) => index.toString()}
              style={{margin: ResponsiveScreen.normalize(10), marginBottom: 0}}
            />
            <Button
              rounded
              bgColor="red"
              height={40}
              width={150}
              text="Lihat Lengkap"
              textType="bold"
              textColor="white"
              textSize={12}
              onPress={() => navigation.navigate('Laporan')}
              style={{marginVertical: ResponsiveScreen.normalize(20)}}
            />
          </Card>
        </View>
      </View>
    </View>
  );
};

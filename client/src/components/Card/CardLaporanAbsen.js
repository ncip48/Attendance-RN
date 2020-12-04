import React from 'react';
import {View} from 'react-native';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {VictoryPie} from 'victory-native';
import {Avatar, Badge} from 'react-native-elements';
import {Card, Text} from '../';
import color from '../../utils/color';

const graphicData = [
  {y: 10, x: '10'},
  {y: 2, x: '2'},
  {y: 1, x: '1'},
];

export const CardLaporanAbsen = (props) => {
  const data = props.data;
  return (
    <Card
      border={10}
      clear
      style={{
        height: ResponsiveScreen.normalize(220),
        width: ResponsiveScreen.normalize(301),
        marginTop: ResponsiveScreen.normalize(30),
        marginBottom: ResponsiveScreen.normalize(26),
        alignSelf: 'center',
      }}>
      <View
        style={{
          height: ResponsiveScreen.normalize(37),
          width: ResponsiveScreen.normalize(301),
          backgroundColor: color.red,
          borderTopLeftRadius: ResponsiveScreen.normalize(10),
          borderTopRightRadius: ResponsiveScreen.normalize(10),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          type="bold"
          color="white"
          size={14}
          text="1 Tahun"
          style={{
            textAlign: 'center',
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          height: ResponsiveScreen.normalize(183),
          //   justifyContent: 'space-around',
          marginLeft: ResponsiveScreen.normalize(39),
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Avatar
            size="large"
            rounded
            source={{
              uri:
                'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png',
            }}
            // title={props.profile.firstName[0]}
            avatarStyle={{
              height: ResponsiveScreen.normalize(70),
              width: ResponsiveScreen.normalize(70),
            }}
            containerStyle={{
              height: ResponsiveScreen.normalize(70),
              width: ResponsiveScreen.normalize(70),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: ResponsiveScreen.normalize(16),
            }}>
            <Badge
              badgeStyle={{
                backgroundColor: color.red,
                height: ResponsiveScreen.normalize(12),
                width: ResponsiveScreen.normalize(12),
                borderRadius: ResponsiveScreen.normalize(10),
              }}
            />
            <Text
              type="bold"
              color="black"
              size={14}
              text="Hadir"
              style={{
                textAlign: 'center',
                marginLeft: ResponsiveScreen.normalize(9),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: ResponsiveScreen.normalize(10),
            }}>
            <Badge
              badgeStyle={{
                backgroundColor: color.yellow,
                height: ResponsiveScreen.normalize(12),
                width: ResponsiveScreen.normalize(12),
                borderRadius: ResponsiveScreen.normalize(10),
              }}
            />
            <Text
              type="bold"
              color="black"
              size={14}
              text="Izin"
              style={{
                textAlign: 'center',
                marginLeft: ResponsiveScreen.normalize(9),
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: ResponsiveScreen.normalize(10),
            }}>
            <Badge
              badgeStyle={{
                backgroundColor: color.blue,
                height: ResponsiveScreen.normalize(12),
                width: ResponsiveScreen.normalize(12),
                borderRadius: ResponsiveScreen.normalize(10),
              }}
            />
            <Text
              type="bold"
              color="black"
              size={14}
              text="Lembur"
              style={{
                textAlign: 'center',
                marginLeft: ResponsiveScreen.normalize(9),
              }}
            />
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginLeft: ResponsiveScreen.normalize(27),
          }}>
          <VictoryPie
            data={graphicData}
            width={ResponsiveScreen.normalize(170)}
            height={ResponsiveScreen.normalize(170)}
            innerRadius={ResponsiveScreen.normalize(55)}
            colorScale={[color.red, color.yellow, color.blue]}
            style={{
              labels: {
                fill: color.black,
                fontSize: ResponsiveScreen.fontSize(8),
              },
            }}
          />
        </View>
      </View>
    </Card>
  );
};

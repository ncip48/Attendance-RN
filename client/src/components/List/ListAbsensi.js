import React from 'react';
import {View, Text} from 'react-native';
import {ListItem, Avatar, Icon} from 'react-native-elements';
import color from '../../utils/color';
import moment from 'moment';
import 'moment/locale/id';

moment.locale('id');

export const ListAbsensi = (props) => {
  return (
    <View style={{padding: 10, paddingVertical: 5}}>
      <ListItem
        containerStyle={{backgroundColor: color.white, borderRadius: 15}}>
        {/* <Avatar
          rounded
          size="large"
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
        /> */}
        {/* <Text>{props.date}</Text> */}
        <Icon
          type="material-community"
          name={props.data.ket != 'A' ? 'calendar-check' : 'calendar-remove'}
          size={40}
          color={props.data.ket != 'A' ? color.secondary : color.red}
        />
        <ListItem.Content>
          <ListItem.Title
            style={{
              color: color.black,
              fontFamily: 'SFPro-Regular',
              fontSize: 16,
            }}>
            {moment(props.date).format('dddd, D MMMM YYYY')}
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              color: color.black,
              fontFamily: 'SFPro-SemiBold',
              fontSize: 14,
            }}>
            Masuk {props.data.ket != 'A' ? props.masuk : '00:00:00'}
          </ListItem.Subtitle>
          <ListItem.Subtitle
            style={{
              color: color.black,
              fontFamily: 'SFPro-SemiBold',
              fontSize: 14,
            }}>
            Pulang {props.data.ket != 'A' ? props.pulang : '00:00:00'}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

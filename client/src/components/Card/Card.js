import React from 'react';
import {View, Text} from 'react-native';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {Card as CardOld, ListItem, Button, Icon} from 'react-native-elements';

export const Card = (props) => {
  return (
    <View
      style={{
        ...props.style,
        borderRadius: ResponsiveScreen.normalize(props.border),
        margin: 0,
        padding: props.clear
          ? ResponsiveScreen.normalize(0)
          : ResponsiveScreen.normalize(20),
        // alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
      {props.children}
    </View>
  );
};

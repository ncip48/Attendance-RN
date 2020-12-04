import React from 'react';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {View, Text as TextOld} from 'react-native';
import color from '../../utils/color';

export const Text = (props) => {
  return (
    <TextOld
      onPress={props.onPress}
      style={{
        ...props.style,
        color:
          props.color === 'yellow'
            ? color.yellow
            : props.color === 'white'
            ? color.white
            : props.color === 'blue'
            ? color.blue
            : props.color === 'red'
            ? color.red
            : props.color === 'darkgray'
            ? color.darkgray
            : color.black,
        fontSize: ResponsiveScreen.fontSize(parseInt(props.size)),
        fontFamily:
          props.type === 'bold'
            ? 'SFPro-Bold'
            : props.type === 'light'
            ? 'SFPro-Light'
            : props.type === 'semibold'
            ? 'SFPro-SemiBold'
            : 'SFPro-Regular',
      }}>
      {props.text}
    </TextOld>
  );
};

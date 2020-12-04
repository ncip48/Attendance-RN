import React from 'react';
import {TouchableOpacity} from 'react-native';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {Text} from '../Text';
import color from '../../utils/color';

export const Button = (props) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={props.disabled}
      onPress={props.onPress}
      style={{
        ...props.style,
        backgroundColor: props.disabled
          ? 'grey'
          : props.bgColor === 'yellow'
          ? color.yellow
          : props.bgColor === 'white'
          ? color.white
          : props.bgColor === 'blue'
          ? color.blue
          : props.bgColor === 'red'
          ? color.red
          : color.black,
        height: ResponsiveScreen.normalize(props.height),
        borderRadius: props.rounded
          ? ResponsiveScreen.normalize(props.height / 2)
          : 5,
        width: ResponsiveScreen.normalize(props.width),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: props.border ? 2 : 0,
        borderColor: props.border ? props.textColor : 'transparent',
      }}
      activeOpacity={0.8}>
      <Text
        color={props.textColor}
        type={props.textType}
        size={props.textSize}
        text={props.text}
      />
    </TouchableOpacity>
  );
};

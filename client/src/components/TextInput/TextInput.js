import React from 'react';
import {View, Text, TextInput as TextInputOld} from 'react-native';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import color from '../../utils/color';

export const TextInput = (props) => {
  return (
    <TextInputOld
      {...props}
      style={{
        borderWidth: 2,
        borderColor: '#DDDDDD',
        borderRadius: ResponsiveScreen.normalize(10),
        paddingLeft: ResponsiveScreen.normalize(15),
        marginVertical: ResponsiveScreen.normalize(5),
        height: ResponsiveScreen.normalize(40),
        fontFamily: 'SFPro-Regular',
        fontSize: ResponsiveScreen.fontSize(14),
      }}
      placeholderTextColor={color.darkgray}
    />
  );
};

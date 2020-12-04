import React from 'react';
import {Input} from 'react-native-elements';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {Button, Card, Text} from '../../components';

export const CardLogin = () => {
  return (
    <>
      <Text
        type="regular"
        size={12}
        text="Masukkan Username dan Password anda, Jika lupa tanyakan kepada administrator"
        style={{
          marginBottom: ResponsiveScreen.normalize(60),
        }}
      />
      <Card border={10}>
        <Input placeholder="Masukkan NRP" />
        <Input placeholder="Masukkan Password" />
        <Button
          rounded
          bgColor="red"
          height={40}
          width={300}
          text="Continue"
          textType="bold"
          textColor="white"
          textSize={12}
        />
      </Card>
    </>
  );
};

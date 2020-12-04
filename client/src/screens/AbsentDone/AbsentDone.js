import React, {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar, BackHandler} from 'react-native';
import {CardAttendance} from '../../components/';
import color from '../../utils/color';

export const AbsentDone = (props) => {
  //   useEffect(() => {
  //     const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
  //       props.navigation.goBack(),
  //     );
  //     return () => backHandler.remove();
  //   });
  return (
    <View style={style.container}>
      <StatusBar backgroundColor="transparent" barStyle={'light-content'} />
      <CardAttendance />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.red,
  },
});

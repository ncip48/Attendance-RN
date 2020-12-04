import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import moment from 'moment';
import {CardCameraDetail} from '../../components/';
import color from '../../utils/color';

export const CameraDetail = (props) => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle={'light-content'} />
      <Header
        centerComponent={{
          text: moment().format('DD MMMM Y'),
          style: {
            fontFamily: 'SFPro-SemiBold',
            color: color.white,
            fontSize: 16,
          },
        }}
        leftComponent={{
          icon: 'chevron-left',
          type: 'material-community',
          color: color.white,
          size: 30,
          onPress: () => props.navigation.goBack(),
        }}
        containerStyle={{
          backgroundColor: color.red,
          borderBottomWidth: 0,
        }}
      />
      <View style={styles.container}>
        <CardCameraDetail />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: color.greysoft,
  },
});

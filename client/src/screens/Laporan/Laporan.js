import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import color from '../../utils/color';
import {Calendar} from 'react-native-calendars';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button, ListAbsensi, CardLaporanAbsen} from '../../components';
import CardDataAbsent from '../../components/Card/CardDateAbsent';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import fakeDate from '../../assets/fakeDate.json';

const Tab = createMaterialTopTabNavigator();

const Absensi = () => {
  const renderItem = ({item, index}) => {
    return (
      <ListAbsensi
        key={index.toString()}
        style={{
          backgroundColor: color.white,
          width: Dimensions.get('window').width,
        }}
        data={item}
        date={item.date}
        masuk={item.time_awal}
        pulang={item.time_akhir}
        cepat={item.time_soon}
      />
    );
  };
  return (
    <View style={{flex: 1, paddingTop: 5}}>
      <FlatList
        data={fakeDate.data.date}
        renderItem={renderItem}
        //refreshing={isLoading}
        //onRefresh={() => fetchData('')}
        keyExtractor={(item, index) => index.toString()}
        //horizontal
        //numColumns={2}
      />
    </View>
  );
};

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

export const Laporan = (props) => {
  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={color.red} barStyle={'light-content'} />
        <Header
          leftComponent={{
            icon: 'chevron-left',
            type: 'material-community',
            color: color.white,
            size: 30,
            onPress: () => props.navigation.goBack(),
          }}
          centerComponent={{
            text: 'Rekap Laporan',
            style: {
              fontFamily: 'SFPro-SemiBold',
              fontSize: ResponsiveScreen.fontSize(16),
              color: color.white,
            },
          }}
          containerStyle={{
            backgroundColor: color.red,
            borderBottomWidth: 0,
          }}
          leftContainerStyle={{
            left: 10,
          }}
        />
        <CardLaporanAbsen data={fakeDate.data.date} />
        <Tab.Navigator>
          <Tab.Screen name="ABSENSI" component={Absensi} />
          <Tab.Screen name="IZIN & CUTI" component={Absensi} />
          <Tab.Screen name="LEMBUR" component={SettingsScreen} />
        </Tab.Navigator>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: 0,
  },
  top: {
    fontFamily: 'SFPro-Light',
    color: color.black,
    fontSize: 18,
    marginBottom: 5,
  },
  txtDashboard: {
    fontFamily: 'SFPro-Bold',
    color: color.black,
    fontSize: 22,
  },
  bottom: {
    flex: 1,
    marginTop: 30,
    backgroundColor: color.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  footer: {
    flex: 1,
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  dot: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: color.secondary,
  },
  dot_red: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: color.red,
  },
  ringkasan: {
    fontFamily: 'SFPro-SemiBold',
    fontSize: 18,
  },
  absent: {
    fontFamily: 'SFPro-Regular',
    marginLeft: 10,
    fontSize: 16,
  },
});

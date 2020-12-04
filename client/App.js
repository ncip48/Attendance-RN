import React, {useContext, useEffect, createContext, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {CustomDrawer} from './src/components';
import {
  Login,
  Absent,
  Camera,
  Home,
  CameraDetail,
  AbsentDone,
  Laporan,
} from './src/screens';
import {UserContextProvider} from './src/context/userContext';

const Stack = createStackNavigator();
ResponsiveScreen.init(375, 812);

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Absent" component={Absent} />
          <Stack.Screen name="AbsentDone" component={AbsentDone} />
          <Stack.Screen name="Camera" component={Camera} />
          <Stack.Screen name="CameraResult" component={CameraDetail} />
          <Stack.Screen name="Laporan" component={Laporan} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;

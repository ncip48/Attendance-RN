import React, {useContext, useEffect, createContext, useState} from 'react';
import {View, Text} from 'react-native';
import Animated, {
  interpolate,
  interpolateColors,
} from 'react-native-reanimated';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Icon, Avatar} from 'react-native-elements';
import color from '../../utils/color';
import {Home, Laporan} from '../../screens';

const AnimatedContext = createContext(void 0);

const Drawer = createDrawerNavigator();

function withFancyDrawer(Component) {
  function Wrapper({children}) {
    const animated = useContext(AnimatedContext);
    const scale = interpolate(animated, {
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });
    const translateMainCard = interpolate(animated, {
      inputRange: [0, 1],
      outputRange: [0, 20],
    });
    const animatedBorderRadius = interpolate(animated, {
      inputRange: [0, 1],
      outputRange: [0, 30],
    });
    const translateTransparentCard = interpolate(animated, {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, -50],
    });
    const CardAnimated = Animated.createAnimatedComponent(Card);

    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: color.primary,
        }}>
        <TransitionContainer
          style={{transform: [{scale, translateX: translateMainCard}]}}>
          <TransparentCard
            style={{
              transform: [{translateX: translateTransparentCard}, {scale: 0.9}],
            }}
          />
          <CardAnimated style={{borderRadius: animatedBorderRadius}}>
            {children}
          </CardAnimated>
        </TransitionContainer>
      </Animated.View>
    );
  }
  return (props) => (
    <Wrapper>
      <Component {...props} />
    </Wrapper>
  );
}

function CustomDrawerContent(props) {
  const [user, setUser] = useState('');

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const u = await AsyncStorage.getItem('user');
    const response = JSON.parse(u);
    setUser(response);
  };

  const doLogout = async () => {
    await AsyncStorage.removeItem('user');
    props.navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerHeader>
        <Avatar
          rounded
          size="large"
          containerStyle={{width: 60, height: 60}}
          // source={{
          //   uri: urlAsset.img + JSON.parse(state.user).photo,
          // }}
        />
        <Text
          style={{
            fontSize: 26,
            color: color.white,
            fontFamily: 'SFPro-Bold',
            marginTop: 10,
          }}>
          {user.nama_pegawai}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'SFPro-Regular',
            //marginTop: 5,
          }}>
          NRP : {user.nrp_pegawai}
        </Text>
      </DrawerHeader>
      <DrawerItemList
        inactiveBackgroundColor={'transparent'}
        inactiveTintColor={'white'}
        activeBackgroundColor={'transparent'}
        activeTintColor={'white'}
        labelStyle={{
          fontFamily: 'SFPro-Regular',
          fontSize: 16,
          marginLeft: -20,
        }}
        itemStyle={{marginLeft: 20}}
        {...props}
      />
      <View
        style={{
          width: '100%',
          aspectRatio: 1.5,
          marginLeft: 35,
          justifyContent: 'center',
          //marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'SFPro-SemiBold',
            //marginTop: 5,
          }}
          onPress={() => doLogout()}>
          Keluar
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}

export const CustomDrawer = () => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  return (
    <AnimatedContext.Provider value={animatedValue}>
      <View style={{backgroundColor: color.primary, flex: 1}}>
        <Drawer.Navigator
          drawerStyle={{
            backgroundColor: 'transparent',
          }}
          drawerType={'slide'}
          initialRouteName="Home"
          overlayColor="transparent"
          drawerContent={(props) => {
            setAnimatedValue(props.progress);
            return <CustomDrawerContent {...props} />;
          }}>
          <Drawer.Screen
            name="Beranda"
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                  type="material-community"
                  name="home-circle"
                  size={25}
                  color={color.white}
                />
              ),
            }}
            component={withFancyDrawer(Home)}
          />
          <Drawer.Screen
            name="Notifikasi"
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                  type="material-community"
                  name="bell-circle"
                  size={25}
                  color={color.white}
                />
              ),
            }}
            component={withFancyDrawer(Home)}
          />
          <Drawer.Screen
            name="Laporan Absensi"
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                  type="material-community"
                  name="calendar"
                  size={25}
                  color={color.white}
                />
              ),
            }}
            component={withFancyDrawer(Laporan)}
          />
          <Drawer.Screen
            name="Akun"
            options={{
              drawerIcon: ({focused, size}) => (
                <Icon
                  type="material-community"
                  name="account-circle"
                  size={25}
                  color={color.white}
                />
              ),
            }}
            component={withFancyDrawer(Home)}
          />
        </Drawer.Navigator>
      </View>
    </AnimatedContext.Provider>
  );
};

const DrawerHeader = styled.View`
  width: 100%;
  aspect-ratio: 1.5;
  margin-left: 30px;
  margin-top: 20px;
  justify-content: center;
`;
const AppTitle = styled.Text`
  font-size: 22px;
  color: white;
  font-weight: bold;
`;
const TransitionContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TransparentCard = styled(Animated.View)`
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.3;
  border-radius: 30px;
`;
const Card = styled.View`
  width: 100%;
  height: 100%;
  ${'' /* border-radius: 30px; */}
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

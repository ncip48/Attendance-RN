import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import SegmentedControl from '@react-native-community/segmented-control';
import {getDistance, convertDistance} from 'geolib';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import {Card, Text, Button} from '../../components/';
import {View, StyleSheet, Dimensions, PermissionsAndroid} from 'react-native';
import color from '../../utils/color';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('screen');
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = LATITUDE_DELTA * (width / height);
const initial_coord = {latitude: '-7.4170', longitude: '111.4990'};

export const CardLocation = (props) => {
  const navigation = useNavigation();
  const [currentLongitude, setCurrentLongitude] = useState(111.499);
  const [currentLatitude, setCurrentLatitude] = useState(-7.417);
  const [locationStatus, setLocationStatus] = useState(true);
  const [address, setAddress] = useState('');
  const [type, setType] = useState(0);
  const [warnJarak, setWarnJarak] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Akses Lokasi Dibutuhkan',
              message: 'Aplikasi ini membutuhkan akses lokasi anda',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus(true);
    Geolocation.getCurrentPosition(
      (position) => {
        setLocationStatus(false);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);

        //get address
        getJarak();
        // getAddress(currentLatitude, currentLongitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus(false);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);

        //get address
        getJarak();
        // getAddress(currentLatitude, currentLongitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    getJarak();
  }, [currentLatitude, currentLongitude]);

  const getJarak = async () => {
    const jarak = await getDistance(initial_coord, {
      latitude: currentLatitude,
      longitude: currentLongitude,
    });
    //console.log(jarak);
    jarak > 25
      ? setWarnJarak('Maaf anda tidak boleh absen karena jarak > 25M')
      : setWarnJarak(null);
  };

  const getAddress = async (lat, long) => {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`,
    );
    setAddress(response.data.display_name);
  };

  return (
    <Card
      border={10}
      clear
      style={{
        height: ResponsiveScreen.normalize(440),
        width: ResponsiveScreen.normalize(301),
        marginTop: ResponsiveScreen.normalize(30),
        alignSelf: 'center',
        // alignItems: 'center',
      }}>
      <View
        style={{
          height: ResponsiveScreen.normalize(250),
          width: ResponsiveScreen.normalize(250),
          marginTop: ResponsiveScreen.normalize(20),
          borderRadius: ResponsiveScreen.normalize(20),
          alignSelf: 'center',
          overflow: 'hidden',
        }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          pitchEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          zoomEnabled={false}
          //   customMapStyle={customStyle}
          region={{
            latitude: Number(currentLatitude),
            longitude: Number(currentLongitude),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker
            coordinate={{
              latitude: Number(currentLatitude),
              longitude: Number(currentLongitude),
            }}>
            <Icon
              type="entypo"
              name="location-pin"
              size={40}
              color={color.red}
            />
          </Marker>
        </MapView>
      </View>
      <Icon
        name="crosshairs-gps"
        type="material-community"
        color={color.red}
        size={ResponsiveScreen.normalize(25)}
        onPress={() => getOneTimeLocation()}
        containerStyle={{
          position: 'absolute',
          top: ResponsiveScreen.normalize(30),
          right: ResponsiveScreen.normalize(35),
          alignSelf: 'flex-end',
        }}
      />
      {/* <Text
        type="semibold"
        color="black"
        size={14}
        text={locationStatus ? 'true' : 'false'}
        style={{
          marginTop: ResponsiveScreen.normalize(27),
          marginHorizontal: ResponsiveScreen.normalize(25),
          textAlign: 'center',
        }}
        locationStatus
      /> */}
      <SegmentedControl
        values={['Masuk', 'Pulang']}
        selectedIndex={type}
        onChange={(event) => {
          setType(event.nativeEvent.selectedSegmentIndex);
        }}
        style={{
          backgroundColor: color.white,
          marginHorizontal: ResponsiveScreen.normalize(26),
          marginTop: ResponsiveScreen.normalize(24),
          height: ResponsiveScreen.normalize(25),
        }}
        tintColor={color.red}
        fontStyle={{
          color: color.black,
        }}
        activeFontStyle={{
          color: color.white,
        }}
      />
      <Text
        type="semibold"
        color="black"
        size={16}
        text={address ? address : currentLatitude + ', ' + currentLongitude}
        style={{
          marginTop: ResponsiveScreen.normalize(24),
          marginHorizontal: ResponsiveScreen.normalize(25),
          textAlign: 'center',
        }}
      />
      <Button
        // disabled={warnJarak ? true : false}
        rounded
        bgColor="red"
        height={40}
        width={150}
        text="Ambil Foto"
        textType="bold"
        textColor="white"
        textSize={12}
        onPress={() =>
          navigation.navigate('Camera', {
            location: {latitude: currentLongitude, longitude: currentLongitude},
            type: type,
          })
        }
        style={{
          position: 'absolute',
          bottom: ResponsiveScreen.normalize(30),
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242f3e',
    padding: 0,
    //paddingTop: 10,
  },
  upper: {
    flex: 1,
    padding: 20,
  },
  footer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: ResponsiveScreen.normalize(20),
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'red',
  },
  pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
});

const customStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#242f3e',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#263c3f',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#6b9a76',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#38414e',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#212a37',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9ca5b3',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#746855',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#1f2835',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#f3d19c',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#2f3948',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#d59563',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#515c6d',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#17263c',
      },
    ],
  },
];

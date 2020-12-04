import React, {useRef, useState, useEffect} from 'react';
import {StatusBar, StyleSheet, View, BackHandler} from 'react-native';
import {Header} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {Icon} from 'react-native-elements';
import ResponsiveScreen from 'react-native-auto-responsive-screen';
import color from '../../utils/color';

export const Camera = (props, {initialProps}) => {
  const location = useState(props.route.params.location);
  const typeAbsen = useState(props.route.params.type);

  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint, flash},
    {
      toggleFacing,
      toggleFlash,
      touchToFocus,
      textRecognized,
      facesDetected,
      recordVideo,
      setIsRecording,
    },
  ] = useCamera(initialProps);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
  //     props.navigation.goBack(),
  //   );
  //   return () => backHandler.remove();
  // });

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      props.navigation.navigate('CameraResult', {
        photo: data.uri,
        location: location[0],
        type: typeAbsen,
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          // type={type}
          type="front"
          // flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View
          style={{
            position: 'absolute',
            marginTop: StatusBar.currentHeight + ResponsiveScreen.normalize(20),
            marginLeft: ResponsiveScreen.normalize(20),
          }}>
          <Icon
            type="material-community"
            name="chevron-left"
            onPress={() => props.navigation.goBack()}
            size={ResponsiveScreen.normalize(35)}
            color={color.white}
            containerStyle={{
              backgroundColor: 'transparent',
            }}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: ResponsiveScreen.normalize(25),
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Icon
            type="material-community"
            name="record-circle"
            onPress={takePicture}
            size={ResponsiveScreen.normalize(55)}
            color={color.white}
            containerStyle={{
              backgroundColor: color.red,
              borderRadius: ResponsiveScreen.normalize(30),
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
});

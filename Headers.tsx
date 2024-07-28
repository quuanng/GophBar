import React from 'react';
import { Image } from 'react-native';

function ExploreHeader() {
  return (
    <Image
      style={{ width: 200, height: 80, alignSelf: 'center' }}
      source={require('./headericons/stan.png')} // Replace with your home header image
      resizeMode="contain"
    />
  );
}

function BarsHeader() {
  return (
    <Image
      style={{ width: 200, height: 80, alignSelf: 'center' }}
      source={require('./headericons/kyle.png')} // Replace with your bars header image
      resizeMode="contain"
    />
  );
}

function PollHeader() {
    return (
      <Image
        style={{ width: 200, height: 80, alignSelf: 'center' }}
        source={require('./headericons/cartman.png')} // Replace with your bars header image
        resizeMode="contain"
      />
    );
  }

  function SettingsHeader() {
    return (
      <Image
        style={{ width: 200, height: 80, alignSelf: 'center' }}
        source={require('./headericons/kenny.png')} // Replace with your bars header image
        resizeMode="contain"
      />
    );
  }

export { ExploreHeader, BarsHeader, PollHeader, SettingsHeader };

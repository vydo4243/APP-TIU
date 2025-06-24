import React from 'react';
import { View } from 'react-native';
import E3Icon from '../assets/icons/E3.svg';
import E4Icon from '../assets/icons/E4.svg';

export default function BlobBackground() {
  return (
    <View className="absolute w-full h-full">
      {/* <E4Icon width={160} height={160} style={{ position: 'absolute', top: 100, left: 15 }} /> */}
      <View className="absolute">
      <View style={{ position: 'absolute', top: 160, left: 8, overflow: 'visible' }}>
        <E4Icon
          width={130} height={100}
          style={{
            transform: [{ rotate: '0deg' }],
          }}
        />
      </View>
    </View>
      <View className="absolute">
      <View style={{ position: 'absolute', top: 320, left: 90, overflow: 'visible' }}>
        <E3Icon
          width={140}
          height={110}
          style={{
            transform: [{ rotate: '-5deg' }],
          }}
        />
      </View>
    </View>
    </View>
  );
}

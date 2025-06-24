import React from 'react';
import { View } from 'react-native';
import E3Icon from '../assets/icons/E3.svg';
import E4Icon from '../assets/icons/E4.svg';

export default function BlobBackground() {
  return (
    <View className="absolute w-full h-full">
      {/* <E4Icon width={160} height={160} style={{ position: 'absolute', top: 100, left: 15 }} /> */}
      <View className="absolute">
      <View style={{ position: 'absolute', top: 160, left: 15, overflow: 'visible' }}>
        <E4Icon
          width={137} height={108}
          style={{
            transform: [{ rotate: '0deg' }],
          }}
        />
      </View>
    </View>
      <View className="absolute">
      <View style={{ position: 'absolute', top: 325, left: 90, overflow: 'visible' }}>
        <E3Icon
          width={142.87}
          height={113.24}
          style={{
            transform: [{ rotate: '-5deg' }],
          }}
        />
      </View>
    </View>
    </View>
  );
}

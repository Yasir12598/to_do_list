import { widthPixel } from '@config/spaces'
import React from 'react'
import { ImageBackground, View } from 'react-native'
import { PrimaryWrapperType } from 'src/module/shared/types'

export default function PrimaryWrapper(props:PrimaryWrapperType) {
  return (
    <ImageBackground
      source={require('@assets/images/background.jpg')}
      style={{
        flex:1,
      }}
    >

      <View
        style={{
          flex:1,
          backgroundColor:'rgba(230,230,230,0.5 )',
        }}
      >
        {props.children}
      </View>

    </ImageBackground>
  )
}
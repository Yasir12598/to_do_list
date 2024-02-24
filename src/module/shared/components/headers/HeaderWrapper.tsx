import { View, Text, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import {useTheme} from '@react-navigation/native'

export default function HeaderWrapper(props:{
    children:ReactNode,
    containerStyle?:ViewStyle
}) {

    const {colors}=useTheme();

  return (
    <View
    style={[{
        backgroundColor:colors.contentBackground,
        alignItems:'center',
        paddingHorizontal:20,
        height:60,
    },props.containerStyle]}
>
  {props.children}
</View>
  )
}
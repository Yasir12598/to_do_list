import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPixel } from '@config/spaces';
import {NavigationProp, ParamListBase, useNavigation, useTheme} from '@react-navigation/native';

export default function BackButton(props:{
    size?:number
}) {

    const {size=widthPixel(30)}=props;
    const {colors}=useTheme();
    const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <TouchableOpacity
        onPress={()=> navigation.goBack()}
        style={{
            width:size,
            height:size,
            borderRadius:size/2,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:colors.primary
        }}
    >
     
     <Icon
        name='chevron-back'
        size={size/1.5}
        color={'white'}
     />

    </TouchableOpacity>
  )
}
import { View, Text } from 'react-native'
import React from 'react'
import {useTheme} from '@react-navigation/native';
import { heightPixel, widthPixel } from '@config/spaces';

export default function EmptyMessage(props:{
    message?:string,
}) {

    const {message='Nothing to do'}=props;
    const {colors}=useTheme();

    return (
        <Text
            style={{
                fontSize:16,
                fontWeight:'600',
                color:colors.primary,
                backgroundColor:colors.contentBackground,
                paddingHorizontal:widthPixel(20),
                paddingVertical:heightPixel(10),
                alignSelf:'center',
            }}
        >
            {message}
        </Text>
    )
}
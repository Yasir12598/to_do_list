import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { heightPixel } from '@config/spaces';

export default function Label(props:{
    label:string
}) {

    const {
        label
    }=props;

    const { colors } = useTheme()

    return (
        <Text
            style={{
                color: colors.primary,
                fontWeight:'bold',
                fontSize:15,
                marginTop:heightPixel(10),
                marginBottom:heightPixel(5)
            }}
        >
            {label}
        </Text>
    )
}
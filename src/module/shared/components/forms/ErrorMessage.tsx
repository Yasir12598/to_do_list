import { View, Text } from 'react-native'
import React from 'react'
import {useTheme} from '@react-navigation/native';

export default function ErrorMessage(props: {
    message?: string
}) {

    const {colors}=useTheme();

    if (props.message)
        return (
            <Text
                style={{
                    color:colors.dangerColor,
                    fontSize:12,
                }}
            >
                {props.message}
            </Text>
        )
}
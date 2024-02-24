import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPixel } from '@config/spaces';
import { useTheme } from '@react-navigation/native';

export default function SelectionButton(props: {
    value: boolean;
    onChange?: (value: boolean) => void
}) {

    const { value, onChange } = props;

    const { colors } = useTheme();

    return (

        <TouchableOpacity
            onPress={() => {
                if (onChange)
                    onChange(!value)
            }}
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >

            <Text
                style={{
                    color: colors.primary,
                }}
            >
                {'Mark as completed '}
            </Text>

            <MaterialCommunityIcon
                name={value ? 'checkbox-outline' : 'checkbox-blank-outline'}
                size={widthPixel(23)}
                color={colors.primary}
            />

        </TouchableOpacity>

    )
}
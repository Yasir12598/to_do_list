import { widthPixel } from '@config/spaces';
import { RoundButtonType } from '@module/shared/types';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RoundButton(props: RoundButtonType) {

    const {
        size = widthPixel(30),
        onPress,
        icon = 'plus',
        isLoading
    } = props;

    const { colors } = useTheme();
    return (
        <TouchableOpacity
            disabled={isLoading}
            onPress={onPress}
            style={[{
                backgroundColor: colors.primary,
                width: size,
                height: size,
                borderRadius: size / 2,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: isLoading ? 0.75:1,
            }, props.containerStyle]}
        >

            {!isLoading ? <Icon
                name={icon}
                size={size / 1.75}
                color={'white'}
            />
                :
                <ActivityIndicator 
                    color={'white'}
                />
            }

        </TouchableOpacity>
    )
}
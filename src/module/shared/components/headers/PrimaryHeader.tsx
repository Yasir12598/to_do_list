import { View, Text,ViewStyle, DimensionValue } from 'react-native'
import React, { ReactNode } from 'react'
import HeaderWrapper from './HeaderWrapper'
import BackButton from '../buttons/BackButton';
import { useTheme } from '@react-navigation/native';

export default function PrimaryHeader(props: {
    leftContentWidth?: DimensionValue,
    leftContent?: ReactNode,
    middleContentWidth?: DimensionValue,
    middleContent?: ReactNode,
    rightContentWidth?: DimensionValue,
    rightContent?: ReactNode,
    isBackButton?: boolean,
    title?: string,
}) {

    const {
        leftContentWidth = '25%',
        leftContent,
        middleContentWidth = '50%',
        middleContent,
        rightContentWidth = '25%',
        rightContent,
        isBackButton,
        title
    } = props;

    const { colors } = useTheme();

    return (
        <HeaderWrapper
            containerStyle={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >

            <View
                style={{
                    width: leftContentWidth,
                }}
            >

                {isBackButton &&
                    <BackButton
                        size={30}
                    />
                }

                {leftContent &&
                    leftContent
                }

            </View>

            <View
                style={{
                    width: middleContentWidth,
                    alignItems: 'center'
                }}
            >

                {title &&
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: colors.primary,
                        }}
                    >
                        {title}
                    </Text>
                }

                {middleContent &&
                    middleContent
                }

            </View>

            <View
                style={{
                    width: rightContentWidth,
                    alignItems:'flex-end'
                }}
            >

                {rightContent &&
                    rightContent
                }

            </View>

        </HeaderWrapper>
    )
}
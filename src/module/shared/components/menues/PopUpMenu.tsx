import { heightPixel } from '@config/spaces';
import { PopUpMenuPropsType } from '@module/shared/types';
import { useTheme } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import {
    Menu,
    MenuOption,
    MenuOptions,
    MenuTrigger,
} from 'react-native-popup-menu';

export default function PopUpMenu(props: PopUpMenuPropsType) {

    const { children, containerStyle, list, menuStyle, selectedOptionId } = props;

    const { colors } = useTheme();

    return (
        <Menu
            style={{
                ...containerStyle,
            }}
        >
            <MenuTrigger>
                {children}
            </MenuTrigger>

            <MenuOptions
                optionsContainerStyle={{
                    paddingVertical: 3,
                    paddingHorizontal: 3,
                    borderRadius: 8,
                    ...menuStyle,
                }}
            >
                {list.map((e) => {
                    return (
                        <MenuOption
                            key={e?.id}
                            onSelect={e?.onPress}
                            style={{
                                paddingVertical: 4,
                                backgroundColor: selectedOptionId == e.id ?
                                    colors.primary + '32'
                                    :
                                    undefined,
                                borderRadius:6,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingVertical: 4,
                                    minHeight: heightPixel(35),
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        width: '85%'
                                    }}
                                >

                                    <Text
                                        style={{
                                            color: colors.primary,
                                            fontSize: 15,
                                            marginLeft: 7.5,
                                        }}
                                    >
                                        {e?.title}
                                    </Text>
                                </View>
                            </View>
                        </MenuOption>
                    );
                })}
            </MenuOptions>
        </Menu>
    );
}

import { View, Text, TextInput as CoreTextInput } from 'react-native'
import React from 'react'
import { Controller, Control } from 'react-hook-form';
import { heightPixel, widthPixel } from '@config/spaces';
import { useTheme } from '@react-navigation/native';
import { FormStyles } from '@module/shared/styles';
import ErrorMessage from '../ErrorMessage';

export default function TextInput(props: {
    control: any,
    name: string,
    isMultiline?: boolean,
    placeholder?: string,
    errorMessage?:string,
}) {

    const {
        control,
        name,
        placeholder,
        isMultiline = false,
        errorMessage
    } = props;

    const {
        colors
    } = useTheme();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, onBlur } }) => {
                return (
                    <>
                        <View
                            style={[FormStyles.input, {
                                backgroundColor: colors.contentBackground,
                                height:  undefined,
                                minHeight: heightPixel(40),
                                justifyContent:'center'
                            }]}
                        >

                            <CoreTextInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder={placeholder}
                                placeholderTextColor={colors.placeholder}
                                multiline={isMultiline}
                                style={{
                                    color: colors.primary,
                                    textAlignVertical:'center',
                                    paddingVertical:heightPixel(5)
                                }}
                            />

                        </View>

                                <ErrorMessage message={errorMessage}/>

                    </>
                )
            }}
        />
    )
}
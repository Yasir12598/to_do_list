
import { widthPixel } from '@config/spaces';
import { FormStyles } from '@module/shared/styles';
import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorMessage from '../ErrorMessage';

const DateTimeInputPicker = (props: {
    control: any,
    name: string,
    mode?: 'date' | 'time' | 'datetime',
    containerStyle?: ViewStyle,
    placeholder?: string,
    errorMessage?:string
}) => {

    const {
        control,
        name,
        mode = 'date',
        containerStyle,
        placeholder,
        errorMessage
    } = props;

    const { colors } = useTheme();

    const [showPicker, setShowPicker] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <TouchableOpacity
                        onPress={() => setShowPicker(true)}
                        style={[FormStyles.input, containerStyle, {
                            backgroundColor: colors.contentBackground,
                            justifyContent: 'center'
                        }]}
                    >
                        <Text
                            style={{
                                color: !value ? colors.placeholder : colors.primary,
                                padding: 0,
                            }}
                        >
                            {value
                                ? mode == 'date'
                                    ? moment(new Date(value)).format('MM/DD/yyyy')
                                    : moment(new Date(value)).format('LT')
                                : placeholder
                                    ? placeholder
                                    : mode == 'date'
                                        ? 'Select Date'
                                        : 'Select Time'}
                        </Text>

                        <Icon
                            name='chevron-down'
                            size={widthPixel(18)}
                            color={colors.placeholder}
                            style={{
                                position:'absolute',
                                right:widthPixel(10)
                            }}
                        />

                    </TouchableOpacity>

                    <ErrorMessage
                        message={errorMessage}
                    />

                    <DateTimePickerModal
                        date={value ? new Date(value) : new Date()}
                        isVisible={showPicker}
                        mode={mode}
                        onConfirm={(val) => {
                            setShowPicker(false);
                            onChange(val.toISOString());
                        }}
                        onCancel={() => setShowPicker(false)}
                    />
                </>
            )}
        />
    );
};

export default DateTimeInputPicker;

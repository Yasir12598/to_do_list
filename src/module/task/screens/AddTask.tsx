import { handelValidationToast } from '@config/helpers'
import { heightPixel, widthPixel } from '@config/spaces'
import RoundButton from '@module/shared/components/buttons/RoundButton'
import Label from '@module/shared/components/forms/Label'
import DateTimeInputPicker from '@module/shared/components/forms/controllers/DateTimePicker'
import TextInput from '@module/shared/components/forms/controllers/TextInput'
import PrimaryHeader from '@module/shared/components/headers/PrimaryHeader'
import { NavigationProp, ParamListBase, useNavigation, useTheme } from '@react-navigation/native'
import { RootState } from '@store/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
import { AddTaskMutation, DeleteTaskMutation, EditTaskMutation } from '../dataBase'
import addTaskValidation from '../schema/addTask.validation'
import { dashboardStyle } from '../styles'
import { AddTaskPropsType, TaskType } from '../types'

export default function AddTask(props: AddTaskPropsType) {
    const [addTaskLoading, setAddTaskLoading] = useState(false);
    const { task } = props.route?.params || {};
    const inset = useSafeAreaInsets()
    const { uuid } = useSelector((state: RootState) => state.shared)
    const navigation: NavigationProp<ParamListBase> = useNavigation();
    const { colors } = useTheme();

    const defaultValues: TaskType = {
        title: '',
        dueDate: '',
        dueTime: '',
        isCompleted: false,
    }

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors
        } }
        = useForm({
            resolver: addTaskValidation,
            defaultValues,
        })

    const handleAddTask = handleSubmit(async data => {
        setAddTaskLoading(true);
        let isSuccess;
        if (task)
            isSuccess = await EditTaskMutation({
                uid: uuid,
                body: { ...data, id: task.id },
                taskId: task.id
            })
        else
            isSuccess = await AddTaskMutation({
                uid: uuid, body: { ...data }
            })
        setAddTaskLoading(false)
        if (isSuccess)
            navigation.goBack();
    }, handelValidationToast)

    const handleDeleteTask = async () => {
        if (task)
            Alert.alert('Delete Task', 'Are you sure you want to delete task?', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await DeleteTaskMutation({
                            taskId: task.id,
                            uid: uuid,
                        })
                        navigation.goBack();
                    }
                }
            ])
    }

    useEffect(() => {
        if (task)
            reset(task)
    }, [task])

    return (
        <View
            style={{
                flex: 1,
            }}
        >

            <PrimaryHeader
                title={task ? 'Edit Task' : 'Add Task'}
                isBackButton
                rightContent={task &&
                    <TouchableOpacity
                        onPress={handleDeleteTask}
                    >
                        <Icon
                            name={'delete'}
                            size={widthPixel(28)}
                            color={colors.primary}
                        />
                    </TouchableOpacity>
                }
            />

            <ScrollView
                keyboardShouldPersistTaps={'handled'}
                style={{
                    paddingHorizontal: widthPixel(10),
                    paddingVertical: widthPixel(10),
                }}
            >

                <View
                    style={{
                        backgroundColor: colors.contentBackground,
                        paddingHorizontal: widthPixel(10),
                        paddingBottom:heightPixel(20),
                        borderRadius:widthPixel(6)
                    }}
                >

                    <Label
                        label='Title'
                    />

                    <TextInput
                        control={control}
                        errorMessage={errors.title?.message}
                        name='title'
                        placeholder='Enter Task Name'
                        isMultiline
                    />

                    <Label
                        label='Due Date'
                    />

                    <DateTimeInputPicker
                        control={control}
                        errorMessage={errors.dueDate?.message}
                        name='dueDate'
                        placeholder='Select Due Date'
                    />

                    <Label
                        label='Due Time'
                    />

                    <DateTimeInputPicker
                        control={control}
                        name='dueTime'
                        mode='time'
                        placeholder='Select Due Time'
                    />

                </View>

            </ScrollView>

            <RoundButton
                isLoading={addTaskLoading}
                icon='check'
                size={60}
                onPress={handleAddTask}
                containerStyle={[
                    dashboardStyle.addButtonContainer, {
                        bottom: widthPixel(10) + inset.bottom,
                    }]}
            />

        </View>
    )
}
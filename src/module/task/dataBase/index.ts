import database from '@react-native-firebase/database';
import {
  AddTaskType,
  DeleteTaskRequestType,
  EditTaskRequestType,
  TaskCompletedRequestType,
  TaskType,
} from '../types';
import {useEffect, useState} from 'react';

const AddTaskMutation = async (data: AddTaskType) => {
  try {
    const taskId = new Date().getTime();
    await database()
      .ref(`users/${data.uid}/tasks/${taskId}`)
      .set({...data.body, id: taskId});
    return true;
  } catch (error) {
    return false;
  }
};

const GetTaskQuery = (uid: string) => {
  const [data, setData] = useState<TaskType[]>();

  useEffect(() => {
    const onValueChange = database()
      .ref(`users/${uid}/tasks`)
      .on('value', snapshot => {
        const res = snapshot.val();
        if (res) setData(Object?.values(res));
        else setData(undefined);
      });

    return () =>
      database().ref(`users/${uid}/tasks`).off('value', onValueChange);
  }, [uid]);

  return data;
};

const EditTaskMutation = async (data: EditTaskRequestType) => {
  try {
    await database()
      .ref(`users/${data.uid}/tasks/${data.taskId}`)
      .update(data.body);
    return true;
  } catch (error) {
    return false;
  }
};

const DeleteTaskMutation = async (data: DeleteTaskRequestType) => {
  try {
    await database().ref(`users/${data.uid}/tasks/${data.taskId}`).remove();
    return true;
  } catch (error) {
    return false;
  }
};

const HandleTaskCompletedMutation = async (data: TaskCompletedRequestType) => {
  try {
    await database().ref(`users/${data.uid}/tasks/${data.taskId}`).update({
      isCompleted: data.isCompleted,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export {
  AddTaskMutation,
  GetTaskQuery,
  HandleTaskCompletedMutation,
  EditTaskMutation,
  DeleteTaskMutation,
};

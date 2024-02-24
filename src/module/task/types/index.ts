interface TaskType {
  title: string;
  dueDate: string;
  dueTime?: string;
  isCompleted:boolean;
}

interface TaskResponseType extends TaskType{
  id:string,
}

interface AddTaskType{
    uid:string,
    body:TaskType
}

interface TaskSectionListType{
  section:string,
  data:TaskResponseType[];
}

interface TaskCompletedRequestType{
  uid:string,
  taskId:string,
  isCompleted:boolean
}

interface EditTaskRequestType {
  uid:string,
  body:TaskResponseType,
  taskId:string,
}

interface DeleteTaskRequestType{
  uid:string,
  taskId:string,
}

interface AddTaskPropsType{
  route?: {
    params: {
      task: TaskResponseType;
    };
  };
}

export type{
    TaskType,
    AddTaskType,
    TaskSectionListType,
    TaskCompletedRequestType,
    TaskResponseType,
    EditTaskRequestType,
    AddTaskPropsType,
    DeleteTaskRequestType
}

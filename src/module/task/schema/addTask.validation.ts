import {due_date_validator, title_validator} from '@config/validations';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const addTaskValidation = Yup.object().shape({
  title: title_validator,
  dueDate: due_date_validator,
  dueTime: Yup.string(),
  isCompleted:Yup.boolean().required(),
});

export default yupResolver(addTaskValidation);

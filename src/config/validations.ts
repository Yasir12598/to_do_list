import * as yup from 'yup';

const title_validator = yup.string().required().label('* Title');
const due_date_validator = yup.string().required().label('* Due Date');


export{
    title_validator,
    due_date_validator
}

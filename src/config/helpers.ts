import Toast from 'react-native-toast-message';
import {validation_error_text1, validation_error_text2} from './contants';
const md5 = require('md5');

const handelValidationToast = () => {
  Toast.show({
    type: 'error',
    text1: validation_error_text1,
    text2: validation_error_text2,
  });
};

const getColor = (inputString = '12345') => {
  const hashedString = md5(inputString);
  const colorCode = `#${hashedString.slice(0, 6)}`;

  return colorCode;
};

export {
  handelValidationToast,
  getColor
};

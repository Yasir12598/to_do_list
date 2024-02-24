import {heightPixel, widthPixel} from '@config/spaces';
import {StyleSheet} from 'react-native';

const FormStyles = StyleSheet.create({
  input: {
    height: heightPixel(40),
    borderRadius: 6,
    paddingHorizontal: widthPixel(10),
  },
});

export {FormStyles};

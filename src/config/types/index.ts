import {Theme} from '@react-navigation/native';

interface CustomTheme extends Theme {
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
    contentBackground: string;
    placeholder: string;
    successColor: string;
    warningColor: string;
    dangerColor: string;
    mainText: string;
  };
}

declare module '@react-navigation/native' {
  export function useTheme(): CustomTheme;
}

export type {CustomTheme};

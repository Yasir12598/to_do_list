import { ReactNode } from "react";
import { TextStyle, ViewStyle } from "react-native";

interface PrimaryWrapperType{
    children:ReactNode
}

interface RoundButtonType{
    size?:number,
    containerStyle?:ViewStyle | ViewStyle[],
    onPress?:()=>void,
    icon?:string,
    isLoading?:boolean
}

interface PopUpMenuListType{
    id:string,
    title:string,
    onPress:()=> void,
}

interface PopUpMenuPropsType{
        children:ReactNode,
        list:PopUpMenuListType[],
        containerStyle?:ViewStyle,
        menuStyle?:ViewStyle,
        selectedOptionId?:string
}

export type{
    PrimaryWrapperType,
    RoundButtonType,
    PopUpMenuPropsType,
    PopUpMenuListType,
}
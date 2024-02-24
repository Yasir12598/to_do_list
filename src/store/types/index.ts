
import { Reducer } from '@reduxjs/toolkit';
import store, { appReducer } from "..";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type CombineReducerType = Reducer<ReturnType<typeof appReducer>>;
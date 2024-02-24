import { colors } from '@config/colors';
import { CustomTheme } from '@config/types';
import { changeUuid } from '@module/shared/store/sharedSlice';
import AddTask from '@module/task/screens/AddTask';
import Dashboard from '@module/task/screens/Dashboard';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/types';
import { v4 as uuidv4 } from 'uuid';
import { navigationRoutes } from './navigation.route';

const Stack = createStackNavigator();

export default function MainStack() {

  const insets = useSafeAreaInsets();
  const { uuid } = useSelector((state: RootState) => state.shared)
  const dispatch=useDispatch();

  const MyTheme: CustomTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
      ...colors,
    },
  };

  const storeUuid=()=>{
    dispatch(changeUuid(uuidv4()))
  }

  useEffect(()=>{
    if(!uuid)
      storeUuid();
  },[])

  if (uuid)
    return (
      <View
        style={{
          flex: 1,
          marginTop: insets.top,
        }}
      >

        <NavigationContainer
          theme={MyTheme}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name={navigationRoutes.Dashboard} component={Dashboard} />
            <Stack.Screen name={navigationRoutes.AddTask} component={AddTask} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    )
}
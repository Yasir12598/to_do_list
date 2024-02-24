import MainStack from '@navigation/MainStack'
import store from '@store/index'
import React from 'react'
import { MenuProvider } from 'react-native-popup-menu'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider } from "react-redux"
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import PrimaryWrapper from './src/module/shared/components/wrappers/PrimaryWrapper'


export default function App() {
  let persistor = persistStore(store);

  return (
    <PrimaryWrapper>
      <SafeAreaProvider>
        <Provider {...{ store }}>
          <PersistGate loading={null} persistor={persistor}>
            <MenuProvider>
              <MainStack />
            </MenuProvider>
          </PersistGate>
        </Provider>
        <Toast />
      </SafeAreaProvider>
    </PrimaryWrapper>
  )
}
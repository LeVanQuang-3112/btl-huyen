import { NativeBaseProvider } from "native-base";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

import React, { useState } from 'react';
import MainContainer from './view/MainContainer';
import LoginContainer from './view/LoginContainer';
import axios from "axios";
import AuthContext from './hook/userContext';

export default function App() {
  axios.defaults.baseURL = 'http://192.168.1.7:3002/api/'
  const [user, setUser] = useState({})
  const [update, forceUpdate] = useState(0)

  return (
    <AuthContext.Provider value={{ user, setUser, up: update, forceUpdate }}>
      <NativeBaseProvider>
        {user.id
          ? <MainContainer />
          : <LoginContainer />
        }
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
}

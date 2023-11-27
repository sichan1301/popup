import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../page/loginpage';
import Guide from '../page/guidepage';
import {NicknamePage} from '../page/nicknamepage';
import { useState,useEffect,useMemo, useCallback } from 'react';
import { loadRefreshTokenFromAsyncStorage, useAuthStore } from '../common/useAuth';
import MainPage from '../page/mainpage';

export type LoginNavigationParamList = {
  LoginPage: undefined;
  GuidePage: undefined;
  NicknamePage: undefined;
  MainPage: undefined;
};

const NavigationStack = createNativeStackNavigator<LoginNavigationParamList>();

const LoginNavigation = () => {
  const {refreshToken} = useAuthStore()
  // const [token,setToken] = useState<string | null>(null)

  // const setRefreshToken = async() => {
  //   const res = await loadRefreshTokenFromAsyncStorage()
  //   setToken(res)
  // }

  useEffect(()=>{
    // setRefreshToken()
    console.log(refreshToken)
  },[])
  
  const initialRouteName = useMemo(()=>refreshToken ? 'MainPage':'GuidePage',[refreshToken])

  return (
    <NavigationStack.Navigator initialRouteName={initialRouteName}>
      <NavigationStack.Screen name="GuidePage" component={Guide} />
      <NavigationStack.Screen name="LoginPage" component={Login} />
      <NavigationStack.Screen name="NicknamePage" component={NicknamePage} />
      <NavigationStack.Screen name="MainPage" component={MainPage} />
    </NavigationStack.Navigator>
  );
};

export default LoginNavigation;

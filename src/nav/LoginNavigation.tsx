import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../page/loginpage';
import Guide from '../page/guidepage';
import {NicknamePage} from '../page/nicknamepage';
import { useMemo } from 'react';
import { useAuthStore } from '../common/useAuth';
import MainPage from '../page/mainpage';

export type LoginNavigationParamList = {
  LoginPage: undefined;
  GuidePage: undefined;
  NicknamePage: undefined;
  MainPage: undefined;
};

const NavigationStack = createNativeStackNavigator<LoginNavigationParamList>();

const LoginNavigation = () => {
  const {nickname} = useAuthStore()
  const initialRouteName = useMemo(()=> nickname ? 'MainPage': 'GuidePage',[nickname])

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

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../page/loginpage';
import Guide from '../page/guidepage';
import {NicknamePage} from '../page/nicknamepage';

export type LoginNavigationParamList = {
  Login: undefined;
  Guide: undefined;
  NicknamePage: undefined;
};

const NavigationStack = createNativeStackNavigator<LoginNavigationParamList>();

const LoginNavigation = () => {
  return (
    <NavigationStack.Navigator initialRouteName="Login">
      <NavigationStack.Screen name="Login" component={Login} />
      <NavigationStack.Screen name="Guide" component={Guide} />
      <NavigationStack.Screen
        name="NicknamePage"
        component={NicknamePage}
      />
    </NavigationStack.Navigator>
  );
};

export default LoginNavigation;

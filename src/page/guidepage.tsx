import {Text, View, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import { LoginNavigationParamList } from '../nav/LoginNavigation'; 
import { useEffect } from 'react';
import { useAuthStore } from '../common/useAuth';

const GuidePage = () => {
  const navigation = useNavigation<NavigationProp<LoginNavigationParamList>>();
  const {refreshToken,nickname,nicknameFromRFEF} = useAuthStore()
  useEffect(()=>{
    console.log(`refreshToken ${refreshToken}`)
  },[])
  return (
    <View>
      <Text>GuidePage</Text>    

      <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
        <Text>Join</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuidePage;

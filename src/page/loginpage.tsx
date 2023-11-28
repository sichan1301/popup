import {Button, Text, TouchableOpacity, View} from 'react-native';
import UsePopUp from '../common/usePopup';
import { useAuthStore } from '../common/useAuth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LoginNavigationParamList } from '../nav/LoginNavigation';
import {useEffect} from 'react';


const LoginPage = () => {
  const navigation = useNavigation<NavigationProp<LoginNavigationParamList>>();

  const linkingWithRFEF = () => {console.log('RFEF와 연동하는 함수 실행됨')}  
  const {setRefreshToken,setIsGoogleLoginedInClubpop} =useAuthStore()

  const googleLogin = () => {
    setRefreshToken('googleLoginRefreshToken')
    setIsGoogleLoginedInClubpop(true)
    navigation.navigate('NicknamePage')
  }

  const guestLogin = () => {
    setRefreshToken('guestLoginRefreshToken')
    setIsGoogleLoginedInClubpop(false)
    navigation.navigate('NicknamePage')
  }

  const {nickname,nicknameFromRFEF,refreshToken} = useAuthStore()

  useEffect(()=>{
    console.log(`loginPage refreshToken ${refreshToken}`)
    console.log(`loginPage nickname ${nickname}`)
    console.log(`loginPage nicknameFromRFEF ${nicknameFromRFEF}`)
  },[refreshToken,nickname,nicknameFromRFEF])
  
  return (
    <>
      {
        (nicknameFromRFEF && !nickname) &&<UsePopUp desc='RFEF의 계정으로 연동하시겠습니까?' linking = {linkingWithRFEF}/>
      }

        <Button onPress = {googleLogin} title ="구글로그인" />
        <Button onPress = {guestLogin} title ="게스트로그인" />
    </>
  );
};

export default LoginPage;

import {Text, View,Button} from 'react-native';
import { useAuthStore } from '../common/useAuth';
import UsePopUp from '../common/usePopup';
import { useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LoginNavigationParamList } from '../nav/LoginNavigation';


const MainPage = () => {
  const {nickname,nicknameFromRFEF,isGoogleLoginedInRFEF,refreshToken,setRefreshToken,isGoogleLoginedInClubpop} = useAuthStore()
  const navigation = useNavigation<NavigationProp<LoginNavigationParamList>>();

  const linkingWithRFEF = () => {console.log('RFEF와 연동하는 함수 실행됨')}
  
  const logout = () => {
    setRefreshToken(null)
    navigation.navigate('GuidePage')
  }

  useEffect(()=>{
    console.log(`mainpage refreshtoken ${refreshToken}`)
    console.log(`mainpage nickname ${nickname}`)
    console.log(`mainpage nicknameFromRFEF ${nicknameFromRFEF}`)
    console.log(`mainpage isGoogleLoginedInRFEF ${isGoogleLoginedInRFEF}`)
  },[refreshToken])

  return (
    <>
      {
        (isGoogleLoginedInRFEF && nicknameFromRFEF) &&
        <View>
          <Text>RFEF에서 구글로그인으로 넘어온 상태임</Text>
        </View>
      }

      {
        (!isGoogleLoginedInRFEF && nicknameFromRFEF) &&
        <View>
          <Text>RFEF에서 게스트로그인으로 넘어온 상태임</Text>
        </View>
      }

      {
        (nicknameFromRFEF && (nicknameFromRFEF!==nickname)) ? 
        <UsePopUp desc={(isGoogleLoginedInRFEF && !isGoogleLoginedInClubpop)? '현재 게스트로그인중입니다. 구글 계정과 연동하시겠습니까??':"현재 로그인 중인 계정과 RFEF의 계정이 다릅니다. 연동하시겠습니까"} linking = {linkingWithRFEF}/>:
        <View>
          <Button title="로그아웃" onPress={logout} />
        </View>
      }   
    </>
  );
};

export default MainPage;

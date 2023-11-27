import {Text, View,Button} from 'react-native';
import { useAuthStore } from '../common/useAuth';
import UsePopUp from '../common/usePopup';


const MainPage = () => {
  const {nickname,nicknameFromRFEF,isGoogleLoginedInRFEF,setRefreshToken} = useAuthStore()
  const linkingWithRFEF = () => {console.log('RFEF와 연동하는 함수 실행됨')}


  return (
    <>
      {(nicknameFromRFEF && nicknameFromRFEF !== nickname) && <UsePopUp desc={isGoogleLoginedInRFEF ? 'RFEF의 구글계정과 연동하시겠습니까?':"현재 로그인 중인 계정과 RFEF의 계정이 다릅니다. 연동하시겠습니까"} linking = {linkingWithRFEF}/>} 
      
      <View>
        <Button title="로그아웃" onPress={()=>setRefreshToken(null)} />
      </View>
    </>
  );
};

export default MainPage;

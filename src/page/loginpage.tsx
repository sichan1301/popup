import {Button, Text, TouchableOpacity, View} from 'react-native';
import UsePopUp from '../common/usePopup';


const LoginPage = () => {

  const linkingWithRFEF = () => {console.log('RFEF와 연동하는 함수 실행됨')}

  return (
    <>
      <UsePopUp desc='RFEF의 계정으로 연동하시겠습니까?' linking = {linkingWithRFEF}/>

      <View>
        <Text>LoginPage</Text>
      </View>
    </>
  );
};

export default LoginPage;

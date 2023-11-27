import { View, Text, Linking, Button} from "react-native"
import axios from 'axios';
import {useCallback, useEffect, useMemo} from 'react'
import { useAuthStore,loadRefreshTokenFromAsyncStorage } from "./common/useAuth";


interface InitializePageProps {
  onSuccess:()=>void;
}

const InitializePage = ({onSuccess}:InitializePageProps) => {
  const {refreshToken,accessToken,setAccessToken,setRefreshToken,setNickname,setIsGoogleLoginedInRFEF,setNicknamefromRFEF} = useAuthStore()
  

  /**
   * 실제로 유효한 token값이 실제로 없으니 임시로 Token을 반환해주는 함수. parameter로 들어온 refreshToken은 헤더의 토큰으로 사용했다고 가정 
   */
  const getAxiosTokenByRefreshToken = (refreshtoken:string) => {
    return {
      accessToken:'access',
      refreshToken:'refresh'
    }
  }

  /**
   * 실제로 유효한 token값이 실제로 없으니 임시로 유저 정보를 반환해주는 함수 
   */
  const getAxiosMyInfo = (isFromRFEF:boolean) => {
    if(isFromRFEF){
      return {
        nickname:'nicknameFromRFEF',
        isGoogle:true
      }
    }else{
      return{
        nickname:'nickname',
        isGoogle:false
      }
    }
  }

+
  useEffect(()=>{
    console.log(refreshToken)
    checkIsFromRFEF()
  },[])

  const checkIsFromRFEF = async()=> { 
    // const initURL = await Linking.getInitialURL() // 원래는 이걸로 확인해야함 
    const initURL = 'http://nft.campvr.kr/event/E002/EN/Detail?token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0b0N4Q211T29CWUJid0xWeXgwenVuOWRaWTQyIiwiYXV0aCI6IlJPTEVfVVNFUiIsInNlcSI6MjE5NTU0LCJzZXNzaW9uIjoiUWljaG1XeWtFSjZQT2RjMjlvT0dPVDM1YS11Tmt2cWtjTE0wYUpkTyIsImV4cCI6MTY5ODg0NDkyOX0.jLpANUMO6cYebws7bRGe5ElrTM3ac3a0qpjIuBYYRtSaLn16XOnZnVMEw3uLri-V6SZOm_VVEYrNhlDsxD2MHQ'
    initURL?initWithRFEFAccessToken(initURL):initWithClubpopRefreshToken()
  };

  const getMyInfo = useCallback(async(isFromRFEF:boolean) =>{
    try{
      // const {data: user} = await axios.get('/user/info',{headers:{Authorization:`Bearer ${accessToken}`}});
      // const {nickname} = user;

      const data = getAxiosMyInfo(isFromRFEF)  // 위 함수 없으니 임시로 
      setNickname(data.nickname);
      if(isFromRFEF) {
        setNicknamefromRFEF(data.nickname)
        setIsGoogleLoginedInRFEF(data.isGoogle)
      }
      onSuccess();
    }catch{}},[accessToken,refreshToken])

  const initWithClubpopRefreshToken = async () => {
    const value = await loadRefreshTokenFromAsyncStorage()
    // useAuth.ts에서 refreshToken 초기값을 null에서 string으로 바꾸면 refreshToken있는 경우를 확인가능함 
    if(!value) return
    try{
      // const data = await axios.get('https://clubpop-stage.3df.co.kr/auth/refresh',{
      //   headers:{
      //     Authorization:`Bearer ${refreshToken}`
      //   }},
      // )
      const data = getAxiosTokenByRefreshToken(value)  //위 함수 대신 임시로 
      const {accessToken} = data;
      setAccessToken(accessToken);
      getMyInfo(false);
    }catch{
      setRefreshToken(null)
    }
  }

  const initWithRFEFAccessToken = async (url:string) => {
    try {
      const [, query] = (url as string).split('?');
      const searchParams = query.split('&').reduce(
        (acc, e) => {
          const [key, value] = e.split('=');
          return {...acc, [key]: value};
        },
        {token: undefined},
        );
        
        if (!searchParams?.token) {
          return;
        }

        const {token: authAccessToken} = searchParams;
        // const {data} = await axios.post('/auth/auth-access-token', {
        // headers:{
        //   Authorization: authAccessToken
        // }})
        const data = getAxiosTokenByRefreshToken(authAccessToken)
        const {accessToken,refreshToken} = data
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        getMyInfo(true)
     }catch{}
  }


  return(
    <View>
      <Text>
        Initialized Page
      </Text>

    </View>
  )
}


export default InitializePage
import { View, Text, Linking} from "react-native"
import {useCallback, useEffect} from 'react'
import { useAuthStore,loadRefreshTokenFromAsyncStorage } from "./common/useAuth";

interface InitializePageProps {
  onSuccess:()=>void;
}

/**
 * @function randomLogin
 * RFEF, Clubpop이 구글로그인인지, 게스트로그인인지 구분하기 위해 랜덤으로 boolean값을 반환하는 함수 
 */
const randomLogin = () => {
  const randomNum = Math.floor(Math.random() * 10 + 1);
  if(randomNum > 5){
    return true
  }else{
    return false
  }
}

/**
 * 테스트 방법 
 * 1. RFEF에서 넘어오지 않을 경우, checkIsFromRFEF에서 const initURL = null 로 실행
 *  1-1 RFEF에서 넘어오지 않았고, clubpop에 로그아웃 돼있던 경우 = useAuthStore의 refreshToken, nickname값을 null로 설정 후 실행
 *  1-2 RFEF에서 넘어오지 않았고, clubpop에 로그인 돼있던 경우 = useAuthStore의 refreshToken, nickname값을 null이 아닌 아무 string값으로 설정 후 실행
 
 * 2. RFEF에서 넘어온 경우, checkIsFromRFEF에서 const initURL = http://~?token=~로 실행 
 *  2-1 RFEF에서 넘어왔고, clubpop에 로그아웃 돼있던 경우 = useAuthStore의 refreshToken, nickname값을 null로 설정 후 실행 
 *  2-2 RFEF에서 넘어왔고, clubpop에 로그인 돼있던 경우 = useAuthStore의 refreshToken, nickname값을 null이 아닌 아무 string값으로 설정 후 실행 
 * 
 * RFEF에서 넘어올 때, clubpop이 로그인 되어있던 경우는 구글로그인, 게스트로그인 중 랜덤으로 설정해놨음 
 */ 

const InitializePage = ({onSuccess}:InitializePageProps) => {
  const {refreshToken,accessToken,setAccessToken,setRefreshToken,setNickname,setIsGoogleLoginedInRFEF,setNicknamefromRFEF,setIsGoogleLoginedInClubpop} = useAuthStore()

  /**
   * 실제로 유효한 token값이 없으니 임시로 Token을 반환해주는 함수. parameter로 들어온 refreshToken은 헤더의 토큰으로 사용했다고 가정 
   */
  const getAxiosTokenByRefreshToken = (refreshtoken:string) => {
    return {
      accessToken:'access',
      refreshToken:'refresh'
    }
  }
  /**
   * 실제로 유효한 token값이 없으니 임시로 유저 정보를 반환해주는 함수 
   */
  const getAxiosMyInfo = (isFromRFEF:boolean) => {
    if(isFromRFEF === true){
      return {
        nickname:'nicknameFromRFEF',
        isGoogleLogin:randomLogin()
      }
    }else{
      return{
        nickname:'nicknamefromClubpop',
        isGoogleLogin:randomLogin()
      }
    }
  }

  useEffect(()=>{
    checkIsFromRFEF()
  },[])

  const checkIsFromRFEF = async()=> { 
    // const initURL = await Linking.getInitialURL()                              // 원래는 이걸로 확인해야함.
    // const initURL = 'http://nft.campvr.kr?token=eyJhbGciOiJI'               // RFEF에서 넘어왔을 경우 (하드코딩)
    const initURL = null                                                        // RFEF에서 넘어오지 않았을 경우
    initURL?initWithRFEFAccessToken(initURL):initWithClubpopRefreshToken()
  };

  /**
   * @function getMyInfo
   * RFEF에서 넘어올 경우 인자값으로 true값 전달, 아닐 경우 false값 전달. 인자값 boolean 상태에 따라서 닉네임 따로 저장 
   */
  const getMyInfo = useCallback(async(isFromRFEF:boolean) =>{
    try{
      // const {data: user} = await axios.get('/user/info',{headers:{Authorization:`Bearer ${accessToken}`}});
      // const {nickname} = user;

      const data = getAxiosMyInfo(isFromRFEF)  // 위의 axios 없으니 임시로 사용
      if(isFromRFEF === true) {
        setNicknamefromRFEF(data.nickname)
        setIsGoogleLoginedInRFEF(data.isGoogleLogin || false)
      }else{
        setNickname(data.nickname);
        setIsGoogleLoginedInClubpop(data.isGoogleLogin || false)
      }
      onSuccess();
    }catch{}},[accessToken,refreshToken])


  /**
   * @function initWithClubpopRefreshToken
   * asyncStorage에 refreshToken이 없엇다면 initialize종료, 있었다면 refreshToken으로 accessToken,refreshToken을 받고 nickname을 받음
   */
  const initWithClubpopRefreshToken = async () => {
    const refreshToken = await loadRefreshTokenFromAsyncStorage()          
    // useAuth.ts에서 refreshToken 초기값을 null에서 string으로 바꾸면 refreshToken있는 경우 확인가능함 
    if(refreshToken === null){
      onSuccess()
      return
    }
    else{
      // const data = await axios.get('https://clubpop-stage.3df.co.kr/auth/refresh',{
      //   headers:{
      //     Authorization:`Bearer ${refreshToken}`
      //   }},
      // )
      const data = getAxiosTokenByRefreshToken(refreshToken)  //위의 axios 대신 임시로 사용. 
      const {accessToken} = data;
      setAccessToken(accessToken);
      getMyInfo(false);  
    }
  }
  
  /**
   * @function initWithRFEFAccessToken
   * RFEF로부터 넘어왔을 경우 URL의 token값으로 accessToken,refreshToken받아온 후 nickname받아와서 전역에 저장
   */

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
        const data = getAxiosTokenByRefreshToken(authAccessToken)  // 위의 axios 대신 임시로 사용 
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
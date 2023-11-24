import { View, Text, Linking } from "react-native"
import {useMemo} from 'react'
import { useAuthStore,loadRefreshTokenFromAsyncStorage } from "./common/useAuth";


interface InitializePageProps {
  onSuccess:()=>void;
}


const InitializePage = ({onSuccess}:InitializePageProps) => {

  const {refreshToken,accessToken} = useAuthStore()


  
  const checkIsFromRFEF = async()=> { 
    const initURL = await Linking.getInitialURL()
    initURL ? initWithClubpopRFEFAccessToken() : initWithClubpopRefreshToken()

  };

  const initWithClubpopRefreshToken = () => {
    const value = loadRefreshTokenFromAsyncStorage()
  }

  const initWithClubpopRFEFAccessToken = () => {
    
  }


  return(
    <View>
      <Text>
        Initialized
      </Text>
    </View>
  )
}


export default InitializePage
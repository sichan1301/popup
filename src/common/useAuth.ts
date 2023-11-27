import { create } from 'zustand'
import AsyncStorage from "@react-native-async-storage/async-storage";


interface useAuthStore {
  refreshToken:string | null,
  accessToken:string | null,
  nickname:string | null,
  nicknameFromRFEF:string | null,
  isGoogleLoginedInRFEF:boolean,

  setRefreshToken: (value:string | null) => void,
  setAccessToken: (value:string) => void,
  setNickname:(value:string) => void,
  setNicknamefromRFEF:(value:string) => void,
  setIsGoogleLoginedInRFEF:(value:boolean) => void
}

export const useAuthStore = create<useAuthStore>((set) => ({
  refreshToken: null,
  accessToken:null,
  nickname:null,
  nicknameFromRFEF:null,
  isGoogleLoginedInRFEF:false,
  setRefreshToken:(value) => {
    if(value!== null){
      set((state)=>({...state,refreshToken:value})),
      setAsyncStorageRefreshToken(value)
    }else{
      AsyncStorage.removeItem('refreshToken')
    }
  },
  setAccessToken: (value) => set({ accessToken: value }),  
  setNickname: (value) => set({ nickname: value }),
  setNicknamefromRFEF: (value) => set({ nickname: value }),
  setIsGoogleLoginedInRFEF: (value) => set({ isGoogleLoginedInRFEF: value }),
}))


const setAsyncStorageRefreshToken = async(value:string) => {
  await AsyncStorage.setItem('refreshToken',value)
}

export const loadRefreshTokenFromAsyncStorage = async() => {
  try{
    const res = await AsyncStorage.getItem('refreshToken')
    return res
  }catch{
    await AsyncStorage.removeItem('refreshToken')
    return null
  }
}

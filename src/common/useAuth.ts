import { create } from 'zustand'
import AsyncStorage from "@react-native-async-storage/async-storage";


interface useAuthStore {
  refreshToken:string | null,
  accessToken:string | null,
  setRefreshToken: (value:string) => void,
  setAccessToken: (value:string) => void,
}

export const useAuthStore = create<useAuthStore>((set) => ({
  refreshToken: "",
  accessToken:null,
  setRefreshToken:(value) => {
    if(value!== null){
      set((state)=>({...state,refreshToken:value})),
      setAsyncStorageRefreshToken(value)
    }else{
      AsyncStorage.removeItem('refreshToken')
    }
  } ,
  setAccessToken: (value) => set({ accessToken: value }),
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

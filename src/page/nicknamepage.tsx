import {Text, View, TextInput,TouchableOpacity,Button} from 'react-native';
import {useState} from 'react';
import { useAuthStore } from '../common/useAuth';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { LoginNavigationParamList } from '../nav/LoginNavigation';

export const NicknamePage = () => {
  const navigation = useNavigation<NavigationProp<LoginNavigationParamList>>();
  const [name, setName] = useState('')
  const {setNickname} = useAuthStore()

  const handleLogin = () =>{
    setNickname(name)
    navigation.navigate('MainPage')
  }
  return (
    <View>
      <TextInput
        value={name}
        onChangeText={e => setName(e)}
        placeholder="Enter a new nickname"
        placeholderTextColor="#BCC3FF"
      />
      <Button title="login" onPress={handleLogin} />
  </View>
  );
};

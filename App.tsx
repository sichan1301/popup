import { useState } from "react";
import { Text, View } from "react-native";
import InitializePage from "./src/initialize";

function App(): JSX.Element {

  const [isInitialized,setIsInitialized] = useState<boolean>(false)

  if(!isInitialized) return <InitializePage onSuccess={()=>{setIsInitialized(true)}}/>

  return (
    <View>
      <Text></Text>
    </View>
  );  
}


export default App;

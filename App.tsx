import { useState } from "react";
import InitializePage from "./src/initialize";
import { NavigationContainer } from "@react-navigation/native";
import LoginNavigation from "./src/nav/LoginNavigation";

function App(): JSX.Element {

  const [isInitialized,setIsInitialized] = useState<boolean>(false)

  if(!isInitialized) return <InitializePage onSuccess={()=>{setIsInitialized(true)}}/>

  return (
    <NavigationContainer>
      <LoginNavigation />
    </NavigationContainer>
  );  
}


export default App;

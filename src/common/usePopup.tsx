import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'


const styles = StyleSheet.create({
  container:{
    flexDirection:'row'
  }
})

interface UsePopupProps {
  desc:string
  linking:any
}


const UsePopUp = ({desc,linking}:UsePopupProps) => {
  return(
    <View>
      <View>
        <Text>{desc}</Text>
      </View>

      <View style={styles.container}>
        <View>
          <Text onPress = {linking}> yes</Text>
        </View>

        <View>
          <Text>no</Text>
        </View>
      </View>
  </View>
  )
}


export default UsePopUp
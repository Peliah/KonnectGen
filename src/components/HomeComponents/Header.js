import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import BottomSheetModal from '../DashboardComponents/BottomSheetModal';
import Client from '../../api/Client';
const Header = ({iconName, iconName2, onPress, generator_route, header}) => {
    const navigation = useNavigation();
    // console.log(typeof generator_route)
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  const deletePost = async ()=> {
    try {
      const response = await Client.delete(`/delgen/${generator_route.genId._id}`)
      console.log(response.data)
    } catch (error) {
      
    }
  }
  const modalOptions = [
    {
      title: 'Share',
      icon: 'share-social-outline',
      action: (gen) => {navigation.navigate('Share', {generator : gen})
                        toggleBottomSheet()}
    },
    {
      title: 'Remove',
      icon: 'trash-outline',
      action: (gen) => {deletePost()}
    },
    {
      title: 'Report Data',
      icon: 'print-outline',
      action: (gen) => {navigation.navigate('Analytics', {generator : gen})
                        toggleBottomSheet()}
    },
    {
      title: 'Shared Users',
      icon: 'people-outline',
      action: (gen) => {}
    },
    {
      title: 'Schedule Maintenance',
      icon: 'construct-outline',
      action: (gen) =>{ navigation.navigate('Schedules', {generator:gen})}
    },
  ]
  
  return (
    <>
        <View style={styles.container}>
            <TouchableOpacity style={{}} onPress={()=>navigation.goBack()}>
                <Icon name={iconName} color={'grey'} size={25}  />
            </TouchableOpacity>
            <View>
                <Text style={styles.title}>{header}</Text>
            </View>
            <TouchableOpacity onPress={toggleBottomSheet}>
                <Icon name={iconName2} size={25}/>
            </TouchableOpacity>
        </View>
        <BottomSheetModal
        isVisible={isBottomSheetVisible}
        onClose={toggleBottomSheet}
        >
        {
            modalOptions.map((op, i)=>(
            <TouchableOpacity  onPress={()=>op.action(generator_route)} key={i} style={styles.modalOptions}>
                {/* <Text>{generator_route}</Text> */}
                <Text>{op.title}</Text>
                <Icon name={op.icon} size={25}/>
            </TouchableOpacity>
            ))
        }
        </BottomSheetModal>
    </>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        // flex:1,
        paddingTop:45,
        paddingBottom:10,
        backgroundColor:"#fff",
        paddingHorizontal: 15,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        elevation: 5, // Add elevation (shadow)
        marginBottom:10
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        // color: 
    },
    modalOptions:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:9,
        elevation:2,
        alignItems:'center',

      }
})
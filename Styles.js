// styles.js
import { StyleSheet } from 'react-native';

const myStyles = StyleSheet.create({
  dateContainer: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:"center",
    backgroundColor:"rgba(0, 113, 117,0.5)", 
    height:140, 
    width:120, 
    borderRadius:20,
    marginRight:10
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  imageContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"60%",
    width:"60%",

  },
  image:{
    alignSelf:"center",
    width:'100%',
    height:'100%'
  },
  imageApi:{
    alignSelf:"center",
    width:'250%',
    height:'250%'
  },
  miniImageContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"50%",
    width:"60%",
    marginBottom:6
  },
  miniImageApi:{
    alignSelf:"center",
    width:'200%',
    height:'200%'
  },
  Title:{
    fontSize:40,
    color:'white',
    fontWeight:"700"
  },
  subTitle:{
    fontSize:30,
    color:"white",
    fontWeight:"200",
    verticalAlign:"bottom"

  }
});

export default myStyles;
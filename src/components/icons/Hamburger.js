import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';



const Hamburger = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image style={styles.img}  
      source={require('../../../assets/images/burger_menu.png')} 
    />
  </TouchableOpacity>
);

export default Hamburger;

// style
const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  img: {
    height: 30,
    width: 30,
  }
});



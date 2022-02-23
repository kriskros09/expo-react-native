import React, { Component } from 'react';
import { Image, View, StyleSheet } from 'react-native';


class Logo extends Component {
  render() {

    return (
        <View style={styles.container}>
            <Image style={styles.logo}
            source={require('../../assets/images/logo.png')} 
            />
        </View>
    );
  }
}

export default Logo;

// style
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start',
  },
  logo: {
    height: 50,
    width: 120,
    resizeMode: 'contain',
  },
});

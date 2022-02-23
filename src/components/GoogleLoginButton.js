import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// UTILS
import { colors } from '../utils/colors';



class GoogleLoginButton extends Component {

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.handleLoginRequest} style={styles.loginButton}>
            <FontAwesome name="google" size={23} />
            <View style={styles.vert}></View>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default GoogleLoginButton;


// style
const styles = StyleSheet.create({
    loginButton: {
        backgroundColor: colors.LIGHT_WHITE,
        paddingRight : 22,
        paddingLeft : 22,
        paddingTop : 15,
        paddingBottom : 15,
        marginBottom : 18,
        borderRadius : 5,
        flexDirection : 'row',
        alignItems : 'center',

    },

    vert : {
        height: 28,
        width: 1,
        backgroundColor: colors.BLACK,
        marginLeft: 10,
        marginRight: 10,
    },

    buttonText : {
        fontSize : 15,
    },

});

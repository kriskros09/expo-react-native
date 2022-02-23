import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';

// UTILS
import { colors } from '../utils/colors';

class ItemSelection extends Component {

  render() {
    const { selectItem, city, checked} = this.props;

    return(
      <TouchableOpacity onPress={() => this.props.selectItem(city.id)} style={styles.buttons} >
          <MaterialIcon style={styles.checkbox}
              name={checked ? 'check-circle-outline' : 'checkbox-blank-circle-outline'}
          />
          <View style={styles.borderLeft} />
          <Text style={styles.buttonText}>{city.name}</Text>
      </TouchableOpacity>
    )
  }
}

export default ItemSelection;

// style
const styles = StyleSheet.create({
  checkbox: {
    color : colors.WHITE,
    fontSize : 20,
    marginTop: 4,
    marginRight : 10,
  },
  buttons : {
      marginBottom: 10,
      backgroundColor : colors.NARCITY_RED,
      padding: 10,
      borderRadius : 6,
      elevation : 1,
      flex : 1,
      flexDirection: 'row'
  },
  buttonText : {
      color: colors.WHITE,
      marginTop: 4,
      fontSize : 18,
      textAlign : 'left',
      fontWeight : "bold",
  },
  borderLeft: {
    backgroundColor : colors.WHITE,
    width: 1,
    height: 'auto',
    marginRight : 10
  },
})

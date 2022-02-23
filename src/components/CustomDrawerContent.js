import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native'



// SELECTORS
import { getDisplayName, getProfilePicture } from '../selectors/auth';

// UTILS
import { colors } from '../utils/colors'



class CustomDrawerContent extends Component {
  constructor(props) {
		super(props);
		this.state = {

		}
  }


  render() {
    const { navigate } = this.props.navigation;
    const { fullName, picture } = this.props;

    return (
        <View style={styles.container}>
              <View style={styles.DrawerContainer}>
                  <View style={styles.AvatarContainer}>
                    <Image style={styles.Avatar}
                        source={{uri: `${picture}`}}
                    />
                      <Text style={styles.userName}>{fullName}</Text>
                  </View>
                  <TouchableOpacity style={styles.DrawerBtn} onPress={() => navigate('Preferences')}>
                      <Text style={styles.BtnText}>Preferences</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.DrawerBtn}  onPress={() => navigate('Login')}>
                      <Text style={styles.BtnText}>Logout</Text>
                  </TouchableOpacity>
              </View>
        </View>
    );
  }
}


const mapStateToProps = (state) => ({
	fullName: getDisplayName(state),
	picture: getProfilePicture(state),
});


export default connect(mapStateToProps, null)(CustomDrawerContent);


// style
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  DrawerContainer: {
    height: 500,
  },
  AvatarContainer: {
    flex: 4,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.CHARCOAL_BLACK,
  },
  Avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  userName: {
    fontSize: 30,
    fontFamily : "Oswald-Regular",
    color: colors.WHITE,
    marginTop: 30,
  },
  DrawerBtn: {
    padding: 20,
    borderBottomColor : colors.GREY,
		borderBottomWidth : 1,
  },
  BtnText: {
    fontSize: 20,
    color: colors.CHARCOAL_BLACK,
  },
});

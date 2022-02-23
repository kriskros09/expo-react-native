import React, { Component } from 'react';
import {StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator, NavigationActions, withNavigation } from 'react-navigation';

// SELECTORS
import { getLoggedIn, getIsAuthenticated } from '../selectors/auth'
import { getIsAuthLoading } from '../selectors/facebook';
import { getHasPreferences, getPreferences } from '../selectors/preferences'

// // COMPONENTS
// import FacebookLoginButton from '../components/FaceBookLoginButton';
// import GoogleLoginButton from '../components/GoogleLoginButton';

// UTILS
import { colors } from '../utils/colors';

class HomeScreen extends Component {

  componentDidMount() {
    this.shouldRedirect()
  }

  shouldRedirect = () => {
    const { isLoggedIn, hasPreferences, navigation, isAuthenticaded } = this.props
    const isProfileComplete = Boolean(isLoggedIn && hasPreferences)
    const shouldRedirectToPreferences = Boolean(isLoggedIn && !hasPreferences)

    if (isProfileComplete) {
      navigation.navigate('Feed')
    } else if (shouldRedirectToPreferences) {
      navigation.navigate('Onboarding')
    } else {
      navigation.navigate('Login')
    }

  }

  render() {
        return (
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
        )
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: getLoggedIn(state),
  hasPreferences: getHasPreferences(state),
  preferences: getPreferences(state),
});

const mapDispatchToProps = dispatch => ({
  requestFacebookLogin: () => dispatch(FacebookLoginRequest()),
  requestGoogleLogin: () => dispatch(GoogleLoginRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


// style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: colors.NARCITY_RED,
    },
    img: {
        height: 100,
        width: 300,
        resizeMode: 'contain',
        marginBottom : 50,
    }
  });

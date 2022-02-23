import React, { Component } from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

// ACTIONS
import { FacebookLoginRequest } from '../actions/facebook';
import { GoogleLoginRequest } from '../actions/google';

// SELECTORS
import { getLoggedIn, getIsAuthFetching } from '../selectors/auth'
import { getHasPreferences } from '../selectors/preferences'

// COMPONENTS
import FacebookLoginButton from '../components/FaceBookLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';

// UTILS
import { colors } from '../utils/colors';

class LogInScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false
    }
  }

  componentWillUnmount() {
    this.setState({isLoading: false})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.setState({isLoading: true})
      if (this.props.isLoggedIn) {
        this.props.navigation.navigate('Home')
      } else {
        this.setState({isLoading: false})
      }
    }
  }


  handleLoginRequest = (type) => {
    switch(type) {
      case 'facebook':
        this.handleFacebookLogin()
        break
      case 'google':
        this.handleGoogleLogin()
        break
    }
  }

  handleFacebookLogin = () => {
    this.props.requestFacebookLogin()
  }

  handleGoogleLogin = () => {
    this.props.requestGoogleLogin()
  }


render() {
  if(this.state.isLoading || this.props.isAuthLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  }

    return (
      <View style={styles.container}>
        <Image style={styles.img} source={require('../../assets/images/logo.png')} />
          <FacebookLoginButton handleLoginRequest={() => this.handleLoginRequest('facebook')} />
          <GoogleLoginButton handleLoginRequest={() => this.handleLoginRequest('google')} />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  curState: state,
  isLoggedIn: getLoggedIn(state),
  hasPreferences: getHasPreferences(state),
  isAuthLoading: getIsAuthFetching(state),
});

const mapDispatchToProps = dispatch => ({
  requestFacebookLogin: () => dispatch(FacebookLoginRequest()),
  requestGoogleLogin: () => dispatch(GoogleLoginRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogInScreen);


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

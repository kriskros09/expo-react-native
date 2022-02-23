import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { NavigationActions } from 'react-navigation'

// ACTIONS
import { DestroySessionDataRequest } from '../actions/session';

// SELECTORS
import { getLoggedIn, getIsAuthenticated } from '../selectors/auth'

// UTILS
import { colors } from '../utils/colors';

// ContentCSS() {
// 	return `
// 			body {
// 					font-size : 26px;
// 					padding: 5px 20px;
// 					font-family : Roboto, Helvetica, Arial, sans-serif;
// 			}
// 	`;
// }

// GetGdprContent() {
// 	return `<!DOCTYPE html>
// 	<html>
// 			<head>
// 					<style>
// 							${this.ContentCSS()}
// 					</style>
// 			</head>
// 			<body>
// 					${this.state.staticmarkup}
// 					<script>
// 							setTimeout(function() {
// 									window.postMessage(document.body.scrollHeight);
// 							}, 500);
// 							window.postMessage(document.body.scrollHeight);
// 					</script>
// 			</body>
// 	<html>`;
// }

class DestroyDataScreen extends Component {

	componentDidUpdate() {
		this.props.navigation.navigate('Home')
	}

	handleSessionDetroyRequest = () => {
		this.props.destroySessionData()


	// const home = NavigationActions.reset({
	// 	index: 0,
	// 	actions: [
	// 		NavigationActions.navigate({
	// 			routeName: 'Home',
	// 		}),
	// 	]
	// });

	// const login = NavigationActions.reset({
	// 	index: 0,
	// 	key: null,
	// 	actions: [
	// 		NavigationActions.navigate({
	// 			routeName: 'Login',
	// 		}),
	// 	]
	// })
	//  console.log(this.props.navigation)
	// // this.props.navigation.dispatch(home);
	// this.props.navigation.dispatch(login);

	}

  render() {
		const { navigate } = this.props.navigation;
    return (
			<ScrollView style={styles.container}>
				<ImageBackground style={styles.headerImg}
					source={require('../../assets/images/DestroyData.jpeg')}
				/>
				<Text style={styles.headingText}>Destroy my data</Text>
				{/* {	this.state.staticmarkup ? <View style={styles.GdprContainer}>
							<WebView
									ref={ _webview => (this._webview = _webview) }
									onMessage={this._webviewOnMessage.bind(this)}
									mixedContentMode="compatibility"
									source={{ html : this.makeContent() }}
									style={{ height: this.state.webheight, width }}
									javaScriptEnabled={true}
									automaticallyAdjustContentInsets={false}
									domStorageEnabled={true}
									decelerationRate="normal"
									startInLoadingState={true}
									scalesPageToFit={true} />
					</View> : <ActivityIndicator color="#FF2634" size="large" style={{marginTop : 100}} />
				} */}
				<View style={styles.btnDestroyContainer}>
						<TouchableOpacity style={styles.prefbuttonDestroy} onPress={() => this.handleSessionDetroyRequest()}>
								<Text style={styles.prefbuttontext}>Destroy my data</Text>
						</TouchableOpacity>
				</View>
			</ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: getLoggedIn(state),
  // hasPreferences: getHasPreferences(state),
  // preferences: getPreferences(state),
});

const mapDispatchToProps = dispatch => ({
  destroySessionData: () => dispatch(DestroySessionDataRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DestroyDataScreen);


// style
const styles = StyleSheet.create({
    container: {
      flex: 1,
	  backgroundColor: colors.WHITE,
	},
	headerImg: {
		height: 200,
		justifyContent: 'center',
	},
	headingText: {
		position: 'absolute',
		top: 85,
		left: 0,
		right: 0,
		textAlign : 'center',
		fontSize: 30,
		fontWeight: 'bold',
		color : colors.WHITE,
	},
	prefbuttonDestroy : {
		backgroundColor : colors.NARCITY_RED,
		borderRadius : 6,
		elevation : 1,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 10,
		paddingTop : 10,
		paddingBottom: 10
	},
	prefbuttontext : {
		color : colors.WHITE,
		fontWeight : 'bold',
		textAlign : 'center',
		fontSize : 20
	},
	btnDestroyContainer: {
		padding: 20,
		backgroundColor: colors.BG_GREY,
	}
});

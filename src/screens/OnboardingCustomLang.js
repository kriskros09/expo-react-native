import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { withNavigation } from 'react-navigation';

// ACTIONS
import { SetPreferencesRequest } from '../actions/preferences';

// UTILS
import { colors } from '../utils/colors';


class OnboardingCustomLangScreen extends Component {

	setPreferencesLanguage = (value) => {
		this.props.setPreferencesRequest('language', value);
		this.props.navigation.navigate('Customcities');
	}

  render() {
	const { navigate } = this.props.navigation;
    return (
		<View style={styles.container}>
			<ImageBackground style={styles.headerImg}
				source={require('../../assets/images/onboard_custom_language.jpeg')}
			/>
			<Text style={styles.headingText}>¿qué tal?</Text>
			<View style={styles.subHeadingContainer}>
				<Text style={styles.subHeading}>In which language would you like the content ?</Text>
			</View>
			<View style={styles.btnContainer}>
				<TouchableOpacity onPress={() => this.setPreferencesLanguage('fr')} style={styles.buttons} >
					<Text style={styles.buttonText}>I'D LIKE TO SEE FRENCH CONTENT</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.setPreferencesLanguage('en')} style={styles.buttons} >
					<Text style={styles.buttonText}>I'D LIKE TO SEE ENGLISH CONTENT</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.setPreferencesLanguage('all')} style={styles.buttons}>
					<Text style={styles.buttonText}>I'D LIKE TO SEE CONTENT IN BOTH LANGUAGES</Text>
				</TouchableOpacity>
			</View>
		</View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setPreferencesRequest: (type, value) => dispatch(SetPreferencesRequest(type, value)),
});

export default withNavigation(connect(null, mapDispatchToProps)(OnboardingCustomLangScreen));


// style
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
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
	subHeadingContainer: {
		borderBottomColor : colors.GREY,
		borderBottomWidth : 2,
		marginLeft : 15,
        marginRight : 15,
	},
	subHeading: {
		color: colors.BLACK,
        paddingTop : 20,
        marginLeft : 20,
        marginRight : 20,
        paddingBottom: 20,
        textAlign : 'center',
        fontSize : 20,
	},
	btnContainer: {
		paddingTop: 40,
		paddingLeft: 20,
		paddingRight: 20,
	},
	buttons : {
        marginBottom: 20,
        backgroundColor : colors.NARCITY_RED,
        padding: 10,
        borderRadius : 6,
        elevation : 1
    },
	buttonText : {
        color: colors.WHITE,
        fontSize : 15,
        textAlign : 'center',
        fontWeight : "bold",
    },

});

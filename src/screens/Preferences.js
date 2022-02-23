import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Dimensions,
	Image,
	ImageBackground,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from 'react-native';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';

// ACTIONS
import { SetPreferencesRequest } from '../actions/preferences';

// SELECTORS
import { getDisplayName, getProfilePicture } from '../selectors/auth';
import { getPreferedFeedType, getPreferedCities, getPreferedLanguage, getPreferedInterests, getAvailableCities, getAvailableInterests } from '../selectors/preferences';

// PICKERS CONST VALUES
import { FeedTypeSelection, LanguagesSelection } from '../constants/preferences';

// UTILS
import { colors } from '../utils/colors';


class PreferencesScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pickerFeedDisplayed: false,
			pickerLangDisplayed: false,
			customOptionsVisible: true,
			pickerFeedSelection: FeedTypeSelection.find(type => type.value === this.props.preferedArticleFeed),
			pickerLangSelection: LanguagesSelection.find(language => language.value === this.props.preferedContentLanguage),
			updatedPreferedCities: this.props.preferedCities,
			updatedPreferedInterests: this.props.preferedInterests,
		}
	}

	// MODAL SETFEEDPICKERVALUE
	setFeedPickerValue (newFeedValue) {
		this.setState({
			pickerFeedSelection: newFeedValue,
			customOptionsVisible: Boolean(newFeedValue.value === 'custom'),
		});

		this.toggleFeedPicker();
		this.props.setPreferencesRequest('feed', newFeedValue.value)
	}

	// MODAL SETLANGPICKERVALUE
	setLangPickerValue (newLangValue) {
		this.setState({
			pickerLangSelection: newLangValue
		});

		this.toggleLangPicker();
		this.props.setPreferencesRequest('language', newLangValue.value)
	}


	// TOGGLE FEED MODAL
	toggleFeedPicker () {
		this.setState({
			pickerFeedDisplayed: !this.state.pickerFeedDisplayed
		})
	}

	// TOGGLE LANG MODAL
	toggleLangPicker () {
		this.setState({
			pickerLangDisplayed: !this.state.pickerLangDisplayed
		})
	}

	// HNADLE PREFS UPDATE
	handlePreferenceUpdate = (type, value) => {
		switch(type) {
			case 'cities':
				this.updateCities(value)
			break
			case 'interests':
				this.updateInterests(value)
			break
			default:
		}
	}

	updateCities = (newId) => {
		const { updatedPreferedCities } = this.state

		let tempPreferedCities = updatedPreferedCities

		if (tempPreferedCities.includes(newId)) {
			tempPreferedCities.splice(tempPreferedCities.indexOf(newId), 1)
		} else {
			tempPreferedCities.push(newId)
		}
		this.setState({updatedPreferedCities: tempPreferedCities})
		this.props.setPreferencesRequest('cities', tempPreferedCities)
	}

	updateInterests = (newId) => {
		const { updatedPreferedInterests } = this.state

		let tempPreferedInterests = updatedPreferedInterests

		if (tempPreferedInterests.includes(newId)) {
			tempPreferedInterests.splice(tempPreferedInterests.indexOf(newId), 1)
		} else {
			tempPreferedInterests.push(newId)
		}
		this.setState({updatedPreferedCities: tempPreferedInterests})
		this.props.setPreferencesRequest('cities', tempPreferedInterests)
	}

  render() {
	let {width, height} = Dimensions.get('window');
	const {
		navigation,
		fullName,
		picture,
		preferedArticleFeed,
		availableCities,
		availableInterests,
		preferedCities,
		preferedInterests,
	} = this.props;
	const { pickerFeedSelection, pickerLangSelection, customOptionsVisible } = this.state
	const avatar = `${picture}`;

    return (
		<View style={styles.container}>
				<ScrollView>
					<ImageBackground style={styles.headerImg}
						source={require('../../assets/images/pref_header_img.jpg')}
					/>
					<View style={styles.AvatarContainer}>
						<Image style={styles.Avatar}
							source={{uri: avatar}}
						/>
						<Text style={styles.userName}>{fullName}</Text>
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.Title}>Preferences</Text>
					</View>
					{/* CUSTOMIZED FEED PICKER */}
					<Text style={styles.subTitle}>Article feed style</Text>
						<TouchableOpacity style={styles.modalButton} onPress={() => this.toggleFeedPicker()}>
							<Text style={styles.btnModalText}>{pickerFeedSelection && pickerFeedSelection.title || ''}</Text>
							<MaterialIcon name="chevron-right" style={styles.chevronRight} />
						</TouchableOpacity>

						<Modal visible={this.state.pickerFeedDisplayed} animationType={"slide"} transparent={true}>
							<View style={styles.modalContainer}>
								{ FeedTypeSelection.map((type, index) => {
									return <TouchableHighlight key={index} onPress={ () => this.setFeedPickerValue(FeedTypeSelection[index])}>
										<Text style={styles.selectOptions}>{type.title}</Text>
									</TouchableHighlight>
								})}

								<TouchableHighlight onPress={() => this.toggleFeedPicker()}>
									<Text style={styles.selectOptions}>Cancel</Text>
								</TouchableHighlight>
							</View>
						</Modal>

						{customOptionsVisible &&
							<View style={styles.container}>
							{/* CUSTOMIZED LANGUAGE PICKER */}
							<Text style={styles.subTitle}>Content language</Text>
							<TouchableOpacity style={styles.modalButton} onPress={() => this.toggleLangPicker()}>
								<Text style={styles.btnModalText}>{pickerLangSelection && pickerLangSelection.title || ''}</Text>
								<MaterialIcon name="chevron-right" style={styles.chevronRight} />
							</TouchableOpacity>

							<Modal visible={this.state.pickerLangDisplayed} animationType={"slide"} transparent={true}>
								<View style={styles.modalContainer}>
									{ LanguagesSelection.map((language, index) => {
										return <TouchableHighlight key={index} onPress={ () => this.setLangPickerValue(LanguagesSelection[index])}>
											<Text style={styles.selectOptions}>{language.title}</Text>
										</TouchableHighlight>
									})}

									<TouchableHighlight onPress={() => this.toggleLangPicker()}>
										<Text style={styles.selectOptions}>Cancel</Text>
									</TouchableHighlight>
								</View>
							</Modal>
							{/* CONTENT CITIES */}
							<Text style={styles.subTitle}>Local content - Cities</Text>
							{availableCities && availableCities.map((city, index) => (
								<TouchableOpacity key={city.id} style={styles.buttons} onPress={() => this.handlePreferenceUpdate('cities', city.id)}>
									<MaterialIcon
										style={styles.checkbox}
										name={preferedCities.includes(city.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
									/>
									<Text style={styles.buttonText}>{city.name}</Text>
								</TouchableOpacity>
							))}
							{/* INTERESTS */}
							<Text style={styles.subTitle}>Interests</Text>
							{availableInterests && availableInterests.map((interest, index) => (
								<TouchableOpacity key={interest.id} style={styles.buttons} onPress={() => this.handlePreferenceUpdate('interests', interest.id)}>
									<MaterialIcon
										style={styles.checkbox}
										name={preferedInterests.includes(interest.id) ? 'checkbox-marked' : 'checkbox-blank-outline'}
									/>
									<Text style={styles.buttonText}>{interest.name}</Text>
								</TouchableOpacity>
							))}
							</View>
						}
					<View>
						<Text style={styles.subTitle}>Account</Text>
						<TouchableOpacity style={styles.logOutButton} >
								<Text style={styles.prefbuttontext}>Logout</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.prefbuttonDestroy} onPress={() => navigation.navigate('Destroy')}>
								<Text style={styles.prefbuttontext}>Destroy my data</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
		</View>
    );
  }
}

const mapStateToProps = (state) => ({
	fullName: getDisplayName(state),
	picture: getProfilePicture(state),
	preferedArticleFeed: getPreferedFeedType(state),
	preferedContentLanguage: getPreferedLanguage(state),
	preferedCities: getPreferedCities(state),
	preferedInterests: getPreferedInterests(state),
	availableCities: getAvailableCities(state),
	availableInterests: getAvailableInterests(state),
});

const mapDispatchToProps = dispatch => ({
	setPreferencesRequest: (type, value) => dispatch(SetPreferencesRequest(type, value)),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(PreferencesScreen));


// style
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.BG_GREY,
	},
	titleContainer: {
		borderBottomColor: colors.BLACK,
		borderBottomWidth: 1,
		paddingBottom: 15,
		marginLeft: 15,
		marginTop: 15,
		marginRight: 15,
		marginBottom: 15,
	},
	headerImg: {
		height: 150,
		justifyContent: 'center',
	},
	Title: {
		color: colors.BLACK,
		fontSize: 25,
		borderBottomWidth: 1,
		borderBottomColor: colors.BLACK,
	},
	subTitle: {
		fontSize: 20,
		color: colors.DARKER_GREY,
		fontWeight: 'bold',
		padding: 15,
	},
	modalButton: {
        backgroundColor : colors.TRANSPARENT,
        paddingTop: 15,
        paddingRight: 5,
        paddingBottom: 15,
        paddingLeft: 15,
        flex : 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
	},
	modalContainer: {
		margin: 20,
		padding: 20,
		left: 20,
		right: 20,
		bottom: 200,
		position: 'absolute',
		borderRadius : 6,
		backgroundColor: colors.WHITE,
	},
	selectOptions: {
		padding: 15,
	},
    btnModalText: {
        color: colors.BLACK,
        fontSize : 18,
        textAlign : 'left',
    },
    chevronRight: {
        color : colors.NARCITY_RED,
        fontSize : 25,
        marginLeft : 30
	},
	checkbox: {
        color : colors.DARKER_GREY,
		fontSize : 20,
		marginTop: 4,
		marginRight : 10,
    },
	buttons : {
		shadowColor : colors.BLACK,
        shadowOffset : { width: 0, height: 1 },
        shadowOpacity : 1,
        shadowRadius : 1,
		marginLeft: 15,
		marginRight: 15,
        marginBottom: 10,
        backgroundColor : colors.WHITE,
        padding: 10,
        borderRadius : 6,
        elevation : 1,
        flex : 1,
        flexDirection: 'row'
    },
	buttonText : {
        color: colors.PREFBTN_TEXT_COLOR,
        marginTop: 2,
        fontSize : 20,
		textAlign : 'left',
		fontWeight: "500"
    },
	logOutButton: {
        backgroundColor : colors.DARKER_GREY,
        borderRadius : 6,
        elevation : 1,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 10,
        paddingTop : 10,
        paddingBottom: 10,
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
	AvatarContainer: {
		position: 'absolute',
		top: 40,
		left: 15,
		flex: 1,
		flexDirection: 'row',
	  },
	  Avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
	  },
	  userName: {
		fontSize: 25,
		fontFamily : "Oswald-Regular",
		color: colors.WHITE,
		marginLeft: 15,
		marginTop: 17,
	  }
});

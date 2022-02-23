import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { withNavigation } from 'react-navigation';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';

// ACTIONS
import { SavePreferencesRequest } from '../actions/preferences';

// SELECTORS
import { getProfileName } from '../selectors/user';
import { getPreferedCities, getPreferedInterests } from '../selectors/preferences';

// UTILS
import { StringifyPreferences } from '../utils/Strings';
import { colors } from '../utils/colors';


class OnboardDoneScreen extends Component {

  handlePreferencesSaveAndNavigation = () => {
    const { navigation, preferedCities, preferedInterests } = this.props;

    if (preferedCities && preferedInterests) {
        const preferences = StringifyPreferences(preferedCities, preferedInterests);
        if(preferences && preferences !== '') {
            this.props.savePreferencesRequest(preferences)
            navigation.navigate('Home')
        }
    }
  }

  render() {
    const { profileName } = this.props;
	const { navigate } = this.props.navigation;
    return (
		<View style={styles.container}>
			<ImageBackground style={styles.bgImage}
				source={require('../../assets/images/onboard_done.jpeg')}
			/>
			<Text style={styles.headingText}>{profileName || ''} We're all set.</Text>
            <TouchableOpacity onPress={() => this.handlePreferencesSaveAndNavigation()} style={styles.nextButton}>
                <Text style={styles.buttonText}>Let's go</Text>
                <MaterialIcon name="chevron-right" style={styles.chevronRight} />
            </TouchableOpacity>
		</View>
    );
  }
}

const mapStateToProps = (state) => ({
    profileName: getProfileName(state),
    preferedCities: getPreferedCities(state),
    preferedInterests: getPreferedInterests(state),
});

const mapDispatchToProps = dispatch => ({
    savePreferencesRequest: (preferences) => dispatch(SavePreferencesRequest(preferences)),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(OnboardDoneScreen));


// style
const styles = StyleSheet.create({
    container: {
        alignItems : 'center',
        flex : 1,
        justifyContent: 'center'
	},
	bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
	},
	headingText: {
		position: 'absolute',
        textAlign : 'center',
        top: '25%',
        fontSize: 40,
        marginLeft: 10,
        marginRight: 10,
		fontWeight: '400',
		color : colors.ONBOARD_TITLE,
    },
    nextButton: {
        position: 'absolute',
        backgroundColor : colors.NARCITY_RED,
        bottom: '45%',
        paddingTop: 10,
        paddingRight: 5,
        paddingBottom: 10,
        paddingLeft: 10,
        borderRadius : 6,
        elevation : 1,
        flex: 1,
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 20,
        color: colors.WHITE,
        fontWeight: 'bold',
    },
    chevronRight: {
        color : colors.WHITE,
        fontSize : 25,
        marginLeft : 0,
    }
});

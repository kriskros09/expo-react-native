import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { withNavigation } from 'react-navigation';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';

// ACTIONS
import { SetPreferencesRequest } from '../actions/preferences';

// COMPONENTS
import ItemSelection from '../components/ItemSelection';

// CONSTANTS
import { cities } from '../constants/cities';

// SELECTORS
import { getAvailableCities } from '../selectors/preferences';


// UTILS
import { colors } from '../utils/colors';

class OnboardingCustomCitiesScreen extends Component {
    state = {
        selected: [],
    }

    selectCity = (id) => {
        const { selected } = this.state;
        let selectedItems = selected;

        const itemWasSelected = this.hasBeenSelected(selectedItems, id)

        if (itemWasSelected) {
            selectedItems.splice(id, 1)
        } else {
            selectedItems.push(id)
        }
        this.setState({ selected: selectedItems})
    }

    hasBeenSelected = (map, selectedId) => {
        return (map.find(item => item === selectedId)) ? true : false;
    }

    handleSaveAndNavigation = () => {
        this.props.setPreferencesRequest('cities', this.state.selected)
        this.props.navigation.navigate('Customcontent');
    }

    render() {
        const { cities } = this.props;
        const { selected } = this.state;

        if(!cities) { // Check fetching as well as available data
            return <View>Loading...</View>
        }

        return (
            <View style={styles.container}>
                <ImageBackground style={styles.headerImg}
                    source={require('../../assets/images/onboard_custom_citie.jpeg')}
                />
                <Text style={styles.headingText}>Local is better</Text>
                <View style={styles.subHeadingContainer}>
                    <Text style={styles.subHeading}>Which cities would you like to stay informed about?</Text>
                </View>
                <ScrollView>
                    <View style={styles.btnContainer}>
                        {cities.map(city =>
                            <ItemSelection
                                key={city.id}
                                selectItem={this.selectCity}
                                city={city}
                                checked={this.hasBeenSelected(selected, city.id)}
                            />
                        )}
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.handleSaveAndNavigation()} style={styles.nextButton}>
                            <Text style={styles.buttonNextText}>Next</Text>
                            <MaterialIcon name="chevron-right" style={styles.chevronRight} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    cities: getAvailableCities(state),
});

const mapDispatchToProps = dispatch => ({
    setPreferencesRequest: (type, value) => dispatch(SetPreferencesRequest(type, value)),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(OnboardingCustomCitiesScreen));


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
		paddingTop: 10,
		paddingLeft: 20,
		paddingRight: 20,
    },
    nextButton: {
        marginTop: 40,
        marginRight:20,
        marginBottom: 30,
        backgroundColor : colors.NARCITY_RED,
        paddingTop: 10,
        paddingRight: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        borderRadius : 6,
        elevation : 1,
        flex : 1,
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    buttonNextText: {
        color: colors.WHITE,
        fontSize : 18,
        textAlign : 'left',
        fontWeight : "bold",
    },
    chevronRight: {
        color : colors.WHITE,
        fontSize : 25,
        marginLeft : 0
    }
});

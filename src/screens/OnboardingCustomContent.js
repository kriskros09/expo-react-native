import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, ScrollView} from 'react-native';
import { withNavigation } from 'react-navigation';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';

// ACTIONS
import { SetPreferencesRequest } from '../actions/preferences';

// COMPONENTS
import ItemSelecttion from '../components/ItemSelection';

// CONSTANTS
import { interests } from '../constants/interests';

// SELECTORS
import { getAvailableInterests } from '../selectors/preferences';

// UTILS
import { colors } from '../utils/colors';


class OnboardingCustomContentScreen extends Component {
    state = {
        selected: [],
    }

    selectInterest = (id) => {
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
        this.props.setPreferencesRequest('interests', this.state.selected)
        this.props.navigation.navigate('Onboarddone');
    }

  render() {
    const { interests } = this.props;
    const { selected } = this.state;

    if(!interests) { // Check fetching as well as available data
        return <View>Loading...</View>
    }

    return (
		<View style={styles.container}>
			<ImageBackground style={styles.headerImg}
				source={require('../../assets/images/onboard_custom_content.jpeg')}
			/>
			<Text style={styles.headingText}>Content you'll crave</Text>
			<View style={styles.subHeadingContainer}>
				<Text style={styles.subHeading}>What are you interested in?</Text>
			</View>
            <ScrollView>
                <View style={styles.btnContainer}>
                    {interests.map(interest =>
                        <ItemSelecttion
                            key={interest.id}
                            selectItem={this.selectInterest}
                            city={interest}
                            checked={this.hasBeenSelected(selected, interest.id)}
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
    interests: getAvailableInterests(state),
});

const mapDispatchToProps = dispatch => ({
    setPreferencesRequest: (type, value) => dispatch(SetPreferencesRequest(type, value)),
});


export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(OnboardingCustomContentScreen));


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
    borderLeft: {
        backgroundColor : colors.WHITE,
        width: 1,
        height: 'auto',
        marginRight : 10
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

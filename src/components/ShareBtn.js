import React, { Component } from 'react';
import { View, StyleSheet, Image, Share} from 'react-native';

// UTILS
import { colors } from '../utils/colors';

class ShareBtn extends Component {
    constructor(props) {
		super(props);
		this.state = {}
    }


    render() {

        return (
            <View style={styles.iconContainer}>
                <Image style={styles.shareIcon}
                source={require('../../assets/images/shareIcon.png')}
                />
            </View>
        );
    }
}

export default ShareBtn;

// style
const styles = StyleSheet.create ({
    iconContainer: {
        backgroundColor : colors.NARCITY_RED,
        position: 'absolute',
        bottom: 20,
        right : 20,
        borderRadius : 35,
        width: 63,
        height: 63,
        padding: 18
    },
    shareIcon: {
        width: 25,
        height: 25,
    }
})

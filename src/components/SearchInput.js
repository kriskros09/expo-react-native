import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';


// UTILS
import { colors } from '../utils/colors';

class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
          placeholder: 'Search for an article',
        };
      }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.placeholder}
                    multiline = {false}
                    numberOfLines = {1}
                    clearTextOnFocus={true}
                    keyboardAppearance={'dark'}
                    keyboardType={'default'}
                    selectionColor={'#FF2634'}
                    onChangeText={(placeholder) => this.setState({placeholder})}
                    value={this.state.placeholder}
                />
            </View>
        );
    }
}

export default SearchInput;


// style
const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 5,
        marginLeft: 15,
        marginRight: 15,
        borderBottomColor: colors.BLACK,
        borderBottomWidth: 1,
    },
    placeholder: {
        color: colors.LIGHT_GREY,
        fontSize: 20,
    },
  });



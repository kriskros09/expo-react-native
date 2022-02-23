import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Moment from 'react-moment';


// ACTIONS
import { fetchSearchRequest, resetSearchResults } from '../actions/search';

// SELECTORS
import { getSearchResults } from '../selectors/search';
import { getFavorites } from '../selectors/favorites';

// UTILS
import { formatURL } from '../utils/formaturl'; // ADDING HTTPS
import { colors } from '../utils/colors';

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: 'Search for an article',
    };
  }

  handleWillFocus = this.props.navigation.addListener(
    'willBlur',
    payload => {
        this.props.resetSearchResults();
    }
  );

  handleSearch = () => {
    const { text } = this.state
    this.props.fetchSearchResults(text)
    this.setState({text: 'Search for an article'})
  }

  isFavorite = (id) => {
    const { favorites } = this.props
    const isFavorite = favorites && Object.keys(favorites).find(key => favorites[key]._id === id)

    return typeof isFavorite !== 'undefined'
  }

  render() {
    const { searchResults, navigation } = this.props;
    const {language} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
            <View style={styles.input}>
                <TextInput
                  clearTextOnFocus={true}
                  keyboardAppearance={'dark'}
                  keyboardType={'default'}
                  multiline = {false}
                  numberOfLines = {1}
                  onChangeText={(text) => this.setState({text})}
                  onSubmitEditing={() => this.handleSearch()}
                  selectionColor={'#FF2634'}
                  style={styles.placeholder}
                  value={this.state.text}
                />
            </View>
        </View>
        {searchResults && searchResults.length > 0 ?
          <FlatList
            data={searchResults}
            keyExtractor={item => item._id}
            renderItem={({item}) =>
              <TouchableOpacity onPress={() => navigation.navigate('Article', { articleDetails: item, articleId: item._id, isFavorite: this.isFavorite(item._id) })}>
                  <ImageBackground style={styles.articleImg} source={{uri: formatURL(item.facebookmedia), cache: 'force-cache'}} />
                  <View style={styles.tagContainer}>
                      <Text style={styles.topicTag}>{item.fulltopic.displayname.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.posteTime}>
                      <Moment date={item.date} element={Text} fromNow locale={language} />
                  </Text>
              </TouchableOpacity>
            }
          /> :
          <Text style={styles.loadingMessage}>Loading ... or no results</Text>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: getSearchResults(state),
  favorites: getFavorites(state),
});

const mapDispatchToProps = dispatch => ({
  fetchSearchResults: (terms) => dispatch(fetchSearchRequest(terms)),
  resetSearchResults: () => dispatch(resetSearchResults()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);


// style
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: colors.BG_GREY,
  },
  inputContainer: {
    backgroundColor: '#32363A',
  },
  input: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    borderRadius: 3,
    backgroundColor: '#2a2c31',
  },
  placeholder: {
    color: colors.LIGHT_GREY,
    fontSize: 20,
  },
  tagContainer: {
    position: 'absolute',
    left : 12,
    top: 185,
    backgroundColor : colors.NARCITY_RED,
    paddingTop : 3,
    paddingBottom : 3,
    paddingLeft : 3,
    paddingRight : 3,
    borderRadius: 4,
  },
  topicTag: {
    fontFamily : "Oswald-Bold",
    color: colors.WHITE,
  },
  articleImg: {
    alignSelf: 'stretch',
    height: 220,
  },
  title: {
    fontFamily : "Oswald-Regular",
    fontSize : 18,
    color : colors.TITLE_COLOR,
    textAlign : 'left',
    fontSize : 25,
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10,
  },
  posteTime: {
    fontSize : 15,
    fontWeight: 'bold',
    color : colors.TITLE_COLOR,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  loadingMessage: {
    fontSize: 20,
    color: colors.DARKER_GREY,
    textAlign: 'center',
  }
});

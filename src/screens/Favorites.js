import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View , Text, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { withNavigation } from 'react-navigation';

// ACTIONS
import { GetFavoritesRequest } from '../actions/favorites';

// SELECTORS
import { getFavorites, getFavoritesIsFetching } from '../selectors/favorites';

// UTILS
import { formatURL } from '../utils/formaturl'; // ADDING HTTPS
import { colors } from '../utils/colors'


class FavoritesScreen extends Component {
  componentDidMount() {
    this.props.getFavoritePosts()
  }

  isFavorite = (id) => {
    const { favoritePosts } = this.props
    const isFavorite = favoritePosts && Object.keys(favoritePosts).find(key => favoritePosts[key]._id === id)

    return typeof isFavorite !== 'undefined'
  }

  render() {
    const { navigation, favoritePosts, isFetching } = this.props

    if (!favoritePosts || isFetching) {
      return <ActivityIndicator />
    } else if (favoritePosts && favoritePosts.length > 0 && !isFetching) {
      return(
        <View style={styles.container}>
          <FlatList
            data={favoritePosts}
            keyExtractor={item => item._id}
            renderItem={({item}) =>
                <TouchableOpacity style={styles.favBtn}  onPress={() => navigation.navigate('Article', { articleDetails: item, articleId: item._id, isFavorite: this.isFavorite(item._id) })}>
                  <Image
                    style={styles.articleImg}
                    source={{uri: formatURL(item.article.media.sizes.square.url), cache: 'force-cache'}}
                  />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{item.article.title[0]}</Text>
                </View>
                </TouchableOpacity>

            }
          />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
              <MaterialIcon style={styles.heart}
                  name="heart"
              />
              <Text style={styles.content}>
                You don't have any article in your favourite.
                Use the heart icon <MaterialIcon style={styles.secondHeart} name="heart"/> on an article for quicker access.
              </Text>
          </View>
        )
    }
  }
}

const mapStateToProps = (state) => ({
  favoritePosts: getFavorites(state),
  isFetching: getFavoritesIsFetching(state),
});

const mapDispatchToProps = dispatch => ({
  getFavoritePosts: () => dispatch(GetFavoritesRequest()),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen));

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BG_GREY,
  },
  heart: {
    fontSize : 80,
    color: colors.DARKER_GREY,
    marginTop: 150,
  },
  secondHeart: {
    fontSize : 20,
    color: colors.DARKER_GREY,
  },
  content: {
    fontSize: 20,
    color: colors.DARKER_GREY,
    textAlign: 'center',
  },
  favBtn: {
    backgroundColor : colors.WHITE,
    flex : 1,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
},
  articleImg: {
    width: 80,
    height: 100,
  },
  titleContainer: {
    padding: 12,
    paddingTop: 5,
    width: Dimensions.get('window').width - 100,
  },
  title: {
    fontFamily : "Oswald-Regular",
    color : colors.TITLE_COLOR,
    textAlign : 'left',
    fontSize : 17,
  },
})

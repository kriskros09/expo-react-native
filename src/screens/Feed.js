import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Moment from 'react-moment';

// ACTIONS
import { fetchArticlesRequest } from '../actions/articles';

// SELECTORS
import { getFavorites } from '../selectors/favorites';


// UTILS
import { colors } from '../utils/colors';

class FeedScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getArticlesFeed();
    }

    isFavorite = (id) => {
        const { favorites } = this.props
        const isFavorite = favorites && Object.keys(favorites).find(key => favorites[key]._id === id)

        return typeof isFavorite !== 'undefined'
    }

  render() {
      const { articles, language, favorites } = this.props;
      const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <FlatList
            data={articles}
            keyExtractor={item => item._id}
            renderItem={({item}) =>
                <TouchableOpacity onPress={() => navigate('Article', { articleDetails: item, articleId: item._id, isFavorite: this.isFavorite(item._id)  })}>
                    <ImageBackground style={styles.articleImg} source={{uri: item.facebookmedia, cache: 'force-cache'}} />
                    <View style={styles.tagContainer}>
                        <Text style={styles.topicTag}>{item.fulltopic.displayname.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.title}>{item.title[0]}</Text>
                    <Text style={styles.posteTime}>
                        <Moment date={item.date} element={Text} fromNow locale={language} />
                    </Text>
                </TouchableOpacity>
            }
        />
      </View>
    );
  }
}


const mapStateToProps = (state) => ({
    articles: state.articles.results,
    language: state.language.language,
    favorites: getFavorites(state),
});
const mapDispatchToProps = dispatch => ({
  getArticlesFeed: () => dispatch(fetchArticlesRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);


// style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.BG_GREY,
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
    posteTime: {
        fontSize : 15,
        fontWeight: 'bold',
        color : colors.TITLE_COLOR,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
    }
  });

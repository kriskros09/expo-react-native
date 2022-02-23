import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ImageBackground,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	WebView,
 } from 'react-native';
 import Moment from 'react-moment';


// ACTIONS
import { fetchAuthorArticlesRequest } from '../actions/author';

// SELECTORS
import { isRelatedArticlesFetching, getRelatedArticles } from '../selectors/author';


// UTILS
import { formatURL } from '../utils/formaturl'; // ADDING HTTPS
import { colors } from '../utils/colors';



class AuthorRelatedArticle extends Component {

	constructor(props) {
		super(props);
		this.state = {
			author: this.props.navigation.getParam('author', {})
		};
	}


	componentDidMount() {
		const { author } = this.state
		const { id } = author
		id && this.props.getRelatedArticlesRequest(id)
	}


render() {
	const { relatedArticles, language, isFetching, navigation } = this.props
	const { author } = this.state

	let {width, height} = Dimensions.get('window')

	if (!relatedArticles || isFetching) {
		return <ActivityIndicator />
	}


    return (
        <ScrollView style={styles.container}>
            <View style={styles.authorContainer}>
                <Image
                    style={styles.authorAvatarBottom}
                    source={{uri : formatURL(author.avatarMini)}}
                />
                <View style={styles.authorInfoBottom}>
                    <Text style={styles.authorNameBottom}>{author.displayname}</Text>
                </View>
			</View>
			<View style={styles.articlesContainer}>
				<FlatList
					data={relatedArticles}
					keyExtractor={item => item._id}
					renderItem={({item}) =>
						<TouchableOpacity style={styles.favBtn}  onPress={() => navigation.navigate('Article', { articleDetails: item, articleId: item._id })}>
						<Image
							style={styles.articleImg}
							source={{uri: formatURL(item.facebookmedia), cache: 'force-cache'}}
						/>
						<View style={styles.titleContainer}>
						<Text style={styles.title}>{item.title}</Text>
						<Moment style={styles.posteTime} date={item.date} element={Text} fromNow locale={language} />
						</View>
						</TouchableOpacity>
					}
				/>
			</View>

        </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  relatedArticles: getRelatedArticles(state),
  language: state.language.language,
  isFetching: isRelatedArticlesFetching(state),
});
const mapDispatchToProps = dispatch => ({
  getRelatedArticlesRequest: (id) => dispatch(fetchAuthorArticlesRequest({id})),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorRelatedArticle);

// style
const styles = StyleSheet.create ({
    container: {
		flex: 1,
		backgroundColor: colors.BG_GREY,
    },
    authorContainer: {
        flex : 1,
        paddingTop : 20,
        paddingRight: 20,
        paddingBottom : 20,
        paddingLeft: 20,
        flexDirection : "row",
        borderBottomColor : colors.NARCITY_RED,
		borderBottomWidth : 5
	},
	authorAvatarBottom: {
		width: 80,
		height: 80,
		alignSelf : 'stretch',
		borderRadius: 40,
	},
	authorInfoBottom: {
		marginLeft: 10,
		marginRight: 100,
	},
	authorNameBottom: {
		fontSize : 15,
		color : colors.BLACK,
	},
	authorBio: {
		fontSize: 10,
		color: colors.TITLE_COLOR,
		marginTop: 5,
	},
	articlesContainer: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: colors.BG_GREY,
	},
	articleImg: {
		height: 300,
		position : 'relative',
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
	posteTime: {
		fontFamily : "Oswald-Regular",
		fontSize :15,
		color : colors.TITLE_COLOR,
		textAlign : 'left',
	},
});

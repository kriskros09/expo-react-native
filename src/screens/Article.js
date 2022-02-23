import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	WebView,
	Share,
 } from 'react-native';
 import { withNavigation } from 'react-navigation';
 import Moment from 'react-moment';


// ACTIONS
import { fetchArticleRequest } from '../actions/article';

import FavoriteIcon from '../components/icons/Favorite';

// SELECTORS
import { getArticleTitle, getArticleDetails, isArticleDetailsFetching } from '../selectors/article';

// UTILS
import { colors } from '../utils/colors';
import { formatURL } from '../utils/formaturl'; // ADDING HTTPS
import { GetArticleContent } from '../utils/GetArticleContent';

// ICON
import ShareBtn from '../components/ShareBtn';
import cssStyle from '../utils/ContentCss';
import ItemSelection from '../components/ItemSelection';


class ArticleScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		const articleDetails = navigation.getParam('articleDetails', {})
		let headerTitle = ''
		switch(true) {
			case Boolean(articleDetails && articleDetails.article && articleDetails.article.title):
				headerTitle = articleDetails.article.title[0]
				break
			case (articleDetails.title instanceof Array):
				headerTitle = articleDetails.title[0]
				break
			case 	articleDetails.title:
				headerTitle = articleDetails.title
				break
			default:
		}
		const articleId = articleDetails._id
		const isFavorite = navigation.getParam('isFavorite', false)

		return {
			headerTitle,
			headerRight: <FavoriteIcon id={articleId} isFavorite={isFavorite} />
		}
	}

	constructor(props) {
		super(props);
	}


componentDidMount() {
	const { navigation, getArticleDetails } = this.props
	const articleId = navigation.getParam('articleId', '');
	articleId && getArticleDetails(articleId);
}


ShareArticle (details) {
	Share.share({
		message: "Take a look at this article :",
		title: details.title,
        url : details.url,
    })
}


  render() {
	const { details, language, navigation, isFetching } = this.props;

	if(!details || isFetching) {
		return <ActivityIndicator />
	}

    return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollContainer}>
				{details && !isFetching &&
				<View style={styles.container}>
					<ImageBackground style={styles.articleImg} source={{uri: formatURL(details.featuredimages.facebook), cache: 'force-cache'}} />
					<View style={styles.titleContainer}>
						{details.title.split(' ').map((item, index) => {
							return (
								<Text key={index} style={styles.ArticleTitle}>
									{item}
								</Text>
							)
						})}
					</View>
					<TouchableOpacity onPress={() => navigation.navigate('AuthorRelatedArticle', { author: details.author})}>
						<View style={styles.authorContainer}>
								<Image
									style={styles.authorAvatar}
									source={{uri: formatURL(details.author.avatarMini), cache: 'force-cache'}}
								/>
								<View style={styles.authorInfo}>
									<Text style={styles.authorName}>{details.author.displayname} -</Text>
									<Moment style={styles.posteTime} date={details.date} element={Text} fromNow locale={language} />
								</View>
						</View>
					</TouchableOpacity>

						<Text style={styles.subtitle}>
							{details.subtitle}
						</Text>
						<View style={styles.webviewContainer}>
							<WebView
								style={styles.webview}
								ref={ _webview => (this._webview = _webview) }
								// onMessage={this._webviewOnMessage.bind(this)}
								mixedContentMode="compatibility"
								source={{html: GetArticleContent(cssStyle, details.content)}}
								domStorageEnabled={true}
								decelerationRate="normal"
								startInLoadingState={false}
								scalesPageToFit={true}
								bounces={true}
								scrollEnabled={true}
							/>
						</View>
						<TouchableOpacity style={styles.authorContainerBottom} onPress={() => navigation.navigate('AuthorRelatedArticle', { author: details.author})}>
								<Image
								style={styles.authorAvatarBottom}
								source={{uri : formatURL(details.author.avatarMini)}}
								/>
								<View style={styles.authorInfoBottom}>
									<Text style={styles.authorNameBottom}>{details.author.displayname}</Text>
									<Text style={styles.authorBio}>{details.author.bio}</Text>
								</View>
						</TouchableOpacity>
				</View>
				}
			</ScrollView>
			<TouchableOpacity style={styles.shareBtn} onPress={() => this.ShareArticle(details)}>
				<ShareBtn />
			</TouchableOpacity>
		</View>
    );
  }
}

const mapStateToProps = (state) => ({
  details: getArticleDetails(state),
	language: state.language.language,
	isFetching: isArticleDetailsFetching(state),
});
const mapDispatchToProps = dispatch => ({
  getArticleDetails: (id) => dispatch(fetchArticleRequest({id})),
});

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(ArticleScreen));

// style
const styles = StyleSheet.create ({
    container: {
		flex: 1,
		backgroundColor: colors.WHITE,
	},
	scrollContainer: {
		flex: 1,
	},
  articleImg: {
		height: 300,
		position : 'relative',
	},
	titleContainer: {
		position : 'absolute',
		position : 'absolute',
		top: 80,
		left : 20,
		right : 20,
		flexDirection:'row',
		flexWrap:'wrap',
	},
    ArticleTitle: {
		fontFamily : "Oswald-Regular",
		color : colors.BLACK,
		fontSize : 30,
		backgroundColor : colors.WHITE,
		marginTop : 6,
		paddingLeft : 3,
		paddingRight : 3
	},
	authorContainer: {
		flex : 1,
		margin: 15,
		flexDirection : "row",
		borderBottomColor : colors.GREY,
		borderBottomWidth : 1,
		alignItems : "center"
    },
	authorInfo: {
		marginTop: 5,
		marginBottom: 10,
		flex : 1,
		flexDirection : 'row',
		alignItems : "center"
	},
	authorAvatar: {
		width: 30,
		height:30,
		alignSelf : 'stretch',
		borderRadius: 15,
		marginTop: 5,
		marginBottom: 10,
	},
    authorName: {
		fontSize : 20,
		color : colors.BLACK,
		textAlign : 'left',
		fontSize : 15,
		marginRight: 5,
		marginLeft: 15,
	},
	posteTime: {
        fontSize :15,
		color : colors.TITLE_COLOR,
	},
	subtitle: {
		color : colors.BLACK,
		fontSize : 20,
		marginLeft : 20,
		marginRight : 20,
		marginBottom : 20
	},
	webview: {
		height: 1000,
	},
	authorContainerBottom: {
		flex : 1,
		marginRight: 15,
		paddingTop : 20,
		marginLeft: 15,
		paddingBottom : 20,
		flexDirection : "row",
		borderTopColor : colors.NARCITY_RED,
		borderTopWidth : 5
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
		fontSize : 24,
		color : colors.BLACK,
	},
	authorBio: {
		fontSize: 10,
		color: colors.TITLE_COLOR,
		marginTop: 5,
	},
});

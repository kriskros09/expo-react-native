import React from 'react';
import { Platform } from 'react-native';
import {
  TabNavigator,
  StackNavigator,
  DrawerNavigator,
  SwitchNavigator,
} from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// SCREENS
import HomeScreen from '../screens/Home';
import LogInScreen from '../screens/LogIn';
import OnboardingCustomFeedScreen from '../screens/OnboardingCustomFeed';
import OnboardingCustomLangScreen from '../screens/OnboardingCustomLang';
import OnboardingCustomCitiesScreen from '../screens/OnboardingCustomCities';
import OnboardingCustomContentScreen from '../screens/OnboardingCustomContent';
import OnboardingDoneScreen from '../screens/OnboardingDone';
import FeedScreen from '../screens/Feed';
import FavoritesScreen from '../screens/Favorites';
import SearchScreen from '../screens/Search';
import PreferencesScreen from '../screens/Preferences';
import ArticleScreen from '../screens/Article';
import AuthorRelatedArticleScreen from '../screens/AuthorRelatedArticle';
import DestroyDataScreen from '../screens/DestroyData'

// COMPONENTS
import { HamburgerIcon, SettingsIcon, BackIcon, FavoriteIcon } from '../components/icons';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Logo from '../components/Logo';

// UTILS
import { colors } from '../utils/colors';

const Tabs = TabNavigator({
  Feed: {
    screen: FeedScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="home" size={23} color={tintColor} />
      ),
    })
  },
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="heart" size={23} color={tintColor} />
      ),
    })
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="search" size={23} color={tintColor} />
      ),
    })
  },
  Preferences: {
    screen: PreferencesScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="user" size={23} color={tintColor} />
      ),
    })
  },
}, {
  initialRouteName: 'Feed',
  tabBarOptions: {
    activeTintColor: colors.BLACK,
    inactiveTintColor: colors.LIGHT_GREY,
    inactiveBackgroundColor: colors.WHITE,
    activeBackgroundColor: colors.LIGHT_WHITE,
    showIcon: true,
    showLabel: false,
    indicatorStyle: {
    },
    style: {
      backgroundColor: colors.WHITE,
    },
    upperCaseLabel: false,
  },
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  animationEnabled: true,
});


const DrawerStack = DrawerNavigator({
  Home: Tabs,
}, {
  contentComponent: props =>
    (<CustomDrawerContent
      {...props}
    />),
})

export const OnboardingStack = StackNavigator({
  Customfeed: OnboardingCustomFeedScreen,
  Customlang: OnboardingCustomLangScreen,
  Customcities: OnboardingCustomCitiesScreen,
  Customcontent: OnboardingCustomContentScreen,
  Onboarddone: OnboardingDoneScreen,
}, {
  cardStyle: {},
  mode: 'card',
  navigationOptions: {
    header: null,
  }
})

export const AppMainStack = StackNavigator({
  Drawer: DrawerStack,
  Article: {
    screen: ArticleScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: colors.NARCITY_RED,
      },
      headerTitleStyle: {
        color: colors.WHITE,
        shadowColor: 'transparent',
        borderBottomColor: 'transparent'
      },
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
    })
  },
  AuthorRelatedArticle: {
    screen: AuthorRelatedArticleScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: colors.NARCITY_RED,
      },
      headerTitleStyle: {
        color: colors.WHITE,
        shadowColor: 'transparent',
        borderBottomColor: 'transparent'
      },
      headerTitle: null,
      headerLeft: <BackIcon onPress={() => navigation.goBack()} />,
    })
  },
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: colors.NARCITY_RED,
      shadowColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    headerTitle: <Logo />,
    headerTitleStyle: {
      color: colors.WHITE,
    },
    headerLeft: <HamburgerIcon onPress={ () => navigation.navigate('DrawerToggle') } />,
  })
})

export const DestroyDataStack = StackNavigator({
  Main: DestroyDataScreen,
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: colors.BLACK,
      shadowColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    headerTitleStyle: {
      color: colors.WHITE,
      shadowColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    headerLeft: <BackIcon onPress={() => navigation.navigate('Preferences')} />,
  })
})

export const MainRoute = SwitchNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
  },
  Feed: AppMainStack,
  Destroy: DestroyDataStack,
  Login: LogInScreen,
  Onboarding: OnboardingStack,
}, {
  initialRouteName: 'Home',
})


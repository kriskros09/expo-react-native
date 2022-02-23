import React, { Component } from 'react';
import { NativeModules, Text, StyleSheet, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { DangerZone, AppLoading, Asset } from 'expo';

import { configureStore } from './store'

import RootContainer from './containers/Root';
import { messages } from './i18n';

const { persistor, store } = configureStore();

class App extends Component {
    state = {
      appIsReady: false,
      deviceLocale: 'en',
      fontLoaded: false,
    }

  async componentWillMount() {
    const currentLocale = await DangerZone.Localization.getCurrentLocaleAsync();
    const imgsLoaded = await this.cacheImages();
    (currentLocale && imgsLoaded) && this.setState({ appIsReady: true, deviceLocale: currentLocale });
  }

  cacheImages = async () => {
    const images = [
      require('../assets/images/burger_menu.png'),
      require('../assets/images/DestroyData.jpeg'),
      require('../assets/images/logo.png'),
      require('../assets/images/onboard_custom_citie.jpeg'),
      require('../assets/images/onboard_custom_content.jpeg'),
      require('../assets/images/onboard_custom_feed.jpeg'),
      require('../assets/images/onboard_custom_language.jpeg'),
      require('../assets/images/onboard_done.jpeg'),
      require('../assets/images/pref_header_img.jpg'),
      require('../assets/images/shareIcon.png')
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)
  }

  render() {
    const { appIsReady, deviceLocale } = this.state;
    const translations = appIsReady ? messages[deviceLocale] : {};

    if (!appIsReady) {
      return (
        <View style={styles.container}>
            <AppLoading
              startAsync={this._cacheImages}
              onFinish={() => this.setState({ isReady: true })}
              onError={console.warn}
            />
        </View>
      );
    }

    return (
      <Provider store={store}>
          <IntlProvider key={deviceLocale} locale={deviceLocale} messages={translations} textComponent={Text}>
            <PersistGate loading={null} persistor={persistor}>
                <RootContainer />
            </PersistGate>
          </IntlProvider>
      </Provider>
    );
  }
}

export default App;

// STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
})

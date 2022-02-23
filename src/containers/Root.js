import React, { Component } from 'react';
import { Font } from 'expo';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { FormattedWrapper } from 'react-native-globalize';
import { StatusBar, Platform } from 'react-native';
import styled from 'styled-components/native';

// RouteConfig
import { MainRoute } from '../config/router'

// UTILS
import { colors } from '../utils/colors';

class RootContainer extends Component {
  constructor(props) {
		super(props);
		this.state = {
      fontLoaded: false
		}
  }

  componentDidMount() {
    this.loadAssetsAsync();
  }

  async loadAssetsAsync() {
    await Font.loadAsync({
      'Oswald-Regular': require('../../assets/fonts/Oswald-Regular.ttf'),
      'Oswald-Bold': require('../../assets/fonts/Oswald-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <ThemeProvider theme={colors}>
        <FormattedWrapper locale={this.props.state.language.language}>
            <Root>
              <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
              { Platform.OS === 'android' && Platform.Version >= 20 ? <StatusBarAndroid /> : null }
              { this.state.fontLoaded ? (
                  <MainRoute />
                ) : null
              }
            </Root>
        </FormattedWrapper>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
	state,
});

export default connect(mapStateToProps,null)(RootContainer);

// style
const Root = styled.View`
flex: 1;
background-color: ${props => props.theme.NARCITY_RED};
`;

const StatusBarAndroid = styled.View`
height: 24;
background-color: ${props => props.theme.WHITE};
`;

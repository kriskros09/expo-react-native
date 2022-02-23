import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

// ACTIONS
import { DeleteFavoritesRequest, SetFavoritesRequest } from '../../actions/favorites';

// SELECTORS
import { getIsFavorite } from '../../selectors/favorites';

class Favorite extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isFavorite: this.props.isFavorite
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.isFavorite !== prevState.isFavorite) {
      this.setState({ isFavorite: this.state.isFavorite })
    }
  }

  handleOnPress = (id) => {
    const { isFavorite } = this.state

    this.setState({isFavorite: !isFavorite}, this.handleSaveDelete(id))
  }

  handleSaveDelete = (id) => {
    const { isFavorite } = this.state

    if (isFavorite) {
      this.props.deleteFavorite(id)
    } else {
      this.props.saveFavorite(id)
    }
  }

  render () {
    const { id } = this.props
    const { isFavorite } = this.state

    return (
      <IconContainer onPress={() => this.handleOnPress(id)}>
        <Ionicons name={isFavorite ? 'md-heart' : 'md-heart-outline'} size={25} color="white" />
      </IconContainer>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  saveFavorite: (id) => dispatch(SetFavoritesRequest(id)),
  deleteFavorite: (id) => dispatch(DeleteFavoritesRequest(id)),
});

export default connect(null, mapDispatchToProps)(Favorite);

// style
const IconContainer = styled.TouchableOpacity`
  height: 100%;
  paddingRight: 15;
  justifyContent: center;
`;

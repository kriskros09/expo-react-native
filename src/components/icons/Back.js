import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';


const Back = ({ onPress }) => (
  <IconLeftContainer onPress={onPress}>
    <Ionicons name="md-arrow-back" size={25} color="white" />
  </IconLeftContainer>
);

export default Back;

// style
const IconLeftContainer = styled.TouchableOpacity`
  height: 100%;
  paddingLeft: 15;
  justifyContent: center;
`;

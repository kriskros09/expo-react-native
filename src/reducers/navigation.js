import MainRoute from '../Navigator';

const initialState = MainRoute.router.getStateForAction(
  MainRoute.router.getActionForPathAndParams('Home')
);
const navigation = (state = initialState, action) => {
  const newState = MainRoute.router.getStateForAction(action, state);
  return newState || state;
};

export default navigation;

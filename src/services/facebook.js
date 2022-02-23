// SERVICES - FACEBOOK
// =============================================================================

// EXPO
import { Facebook } from 'expo';
import { facebook } from '../constants/social';

export const facebookLogin = async () => {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(facebook.appId, {
    permissions: ['public_profile'],
    behavior: 'web',
  });
  return { type, token };
}

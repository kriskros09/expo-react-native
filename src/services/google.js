// SERVICES - FACEBOOK
// =============================================================================

// EXPO
import { Google } from 'expo';
import { google } from '../constants/social';

export const googleLogin = async () => {
  const { type, accessToken } = await Google.logInAsync({
    iosClientId: google.iosClientId,
    scopes: ['profile'],
    webClientId: google.webClientId,
  });
  return { type, accessToken };
}

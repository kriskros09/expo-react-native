// AUTH - ACTIONS
// =============================================================================

import * as SessionActionTypes from '../actions/types/session';

export function DestroySessionDataRequest() {
  return {
    type: SessionActionTypes.DESTROY_SESSION_DATA_REQUEST
  }
}

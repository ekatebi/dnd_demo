
import { REFRESH_PALETTE } from '../constants/yoDnD'; 

const initState = {

};

export default (state = initState, action) => {
  switch (action.type) {
    case REFRESH_PALETTE:
      return {...state, timestamp: action.timestamp};
    default:
      return state
  }
}

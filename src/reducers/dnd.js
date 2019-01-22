
import { 
  REG_DRAGGABLE,
  REFRESH_PALETTE,
  DROP_DRAGGABLE,
  REMOVE_DRAGGABLE
} from '../constants/yoDnD'; 

const initState = {
  draggables: {},
  droppedDraggable: {},
  removedDraggable: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case REG_DRAGGABLE:
      return { ...state, draggables: {...state.draggables, [action.id]: action.tag} };
    case REFRESH_PALETTE:
      return { ...state, timestamp: action.timestamp,
        tagToReplenish: state.draggables[action.id] };
    case DROP_DRAGGABLE:
      return { ...state, droppedDraggable: {...action.droppedDraggable} };
    case REMOVE_DRAGGABLE:
      return { ...state, removedDraggable: {...action.removedDraggable} };
    default:
      return state
  }
}

import { 
  REG_DRAGGABLE,
  REFRESH_PALETTE,
  DROP_DRAGGABLE,
  REMOVE_DRAGGABLE
} from '../constants/yoDnD'; 

export function regDraggable(id, tag) {
  return {
    type: REG_DRAGGABLE,
    id,
    tag
  };
}

export function refreshPalette(id) {
  return {
    type: REFRESH_PALETTE,
    timestamp: +new Date(),
    id
  };
}

export function dropDraggable(tag, left, top) {
  return {
    type: DROP_DRAGGABLE,
    droppedDraggable: {
      timestamp: +new Date(),
      tag,
      left,
      top
    }
  };
}

export function removeDraggable(id) {
  return {
    type: REMOVE_DRAGGABLE,
    removedDraggable: {
      timestamp: +new Date(),
      id
    }
  };
}

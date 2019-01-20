import { REFRESH_PALETTE } from '../constants/yoDnD'; 

export function refreshPalette() {
  return {
    type: REFRESH_PALETTE,
    timestamp: +new Date()
  };
}

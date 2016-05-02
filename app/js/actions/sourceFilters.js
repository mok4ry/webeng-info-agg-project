export const SELECT_SOURCE = 'SELECT_SOURCE';
export const DESELECT_SOURCE = 'DESELECT_SOURCE';

function toggleSource(source, actionType) {
  return {
    type: actionType,
    source,
  };
}

export function selectSource(source) {
  return dispatch => dispatch(toggleSource(source, SELECT_SOURCE));
}

export function deselectSource(source) {
  return dispatch => dispatch(toggleSource(source, DESELECT_SOURCE));
}

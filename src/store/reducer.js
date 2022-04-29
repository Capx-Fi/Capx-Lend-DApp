const defaultState = {
  metadata: {}, // It should be empty during store init
  isDataInitialized: false, // You can add additional property to denote, that data is not fetched for the first time,
  selectedNode: null,
  mapCenter: [-97.9222112121185, 39.3812661305678],
  mapZoom: [2.5],
  station: undefined
};


function rootReducer(state = defaultState, action) {
  switch (action.type) {
    case 'DATA_INITIALIZED':
      return {
        ...state,
        metadata: action.metadata,
        isDataInitialized: true
      };
    case 'SET_ACTIVE_NODE':
      return {
        ...state,
        selectedNode: action.payload.id,
        mapCenter: action.payload.position,
        station: action.payload,
        mapZoom:[11],
      };
    case 'SET_ACTIVE_STATION':
      return {
        ...state,
        station: action.payload
      };
    case 'RESET_STATION':
      return {
        ...state,
        station: undefined
      };
    default:
      return state;
  }
}
export default rootReducer;

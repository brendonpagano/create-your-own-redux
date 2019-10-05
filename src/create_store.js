/**
 * Creates a Redux store.
 *
 * @param {Function} reducer
 * @param {any} [preloadedState]
 * @param {Function} [enhancer]
 *
 * @return {Object}
 */
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== 'function') {
    throw new TypeError('reducer must be a function');
  }

  let state = preloadedState || {};

  const storeListeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    const newState = reducer(action, state);
    state = newState;
    storeListeners.forEach((fn) => fn());
  };

  const subscribe = (listener) => {
    const currentListenersIndex = storeListeners.length;
    storeListeners.push(listener);
    return () => storeListeners.splice(currentListenersIndex, 1);
  };

  const replaceReducer = (nextReducer) => {
    reducer = nextReducer;
  };

  return Object.freeze({
    getState,
    dispatch,
    subscribe,
    replaceReducer,
  });
}

module.exports = createStore;

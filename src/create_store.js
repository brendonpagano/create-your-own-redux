/**
 * Creates a Redux store.
 *
 * @param {Function} reducer
 * @param {any} preloadedState
 * @param {Function} enhancer
 *
 * @return {Object}
 */
function createStore(reducer, preloadedState, enhancer) {
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

  return Object.freeze({
    getState,
    dispatch,
    subscribe,
  });
}

module.exports = createStore;

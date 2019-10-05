const { createStore } = require('../src');

describe('createStore', () => {
  it('exposes the public API', () => {
    const store = createStore(() => {});
    const methods = Object.keys(store);

    expect(methods.length).toBe(4);
    expect(methods).toContain('subscribe');
    expect(methods).toContain('dispatch');
    expect(methods).toContain('getState');
    expect(methods).toContain('replaceReducer');
  });

  it('throws if reducer is not a function', () => {
    expect(() => createStore(undefined)).toThrow();
    expect(() => createStore('test')).toThrow();
    expect(() => createStore({})).toThrow();
    expect(() => createStore(() => {})).not.toThrow();
  });

  it('passes the initial state', () => {
    const store = createStore(() => {}, [
      {
        id: 1,
        text: 'Hello',
      },
    ]);
    expect(store.getState()).toEqual([
      {
        id: 1,
        text: 'Hello',
      },
    ]);
  });
});

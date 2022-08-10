

import {
    legacy_createStore as createStore,
    applyMiddleware,
    compose,
  } from "redux";
  import thunk from "redux-thunk";
  import { reducers } from "../reducers";
  
  // sauvegarde dans le localStorage
  function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
  }
  // chargement depuis le localStorage
  function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
  }

  // pour l'extension Redux DevTools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedState = loadFromLocalStorage();
  
  // création du store
  const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));
  
  // sauvegarde le store dans le localStorage
  store.subscribe(() => saveToLocalStorage(store.getState()));
  
  export default store;


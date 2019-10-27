import React, { useState } from 'react';
import { Image } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; //todo: remove after develop is finished

//todo: import reducers
import authReducer from './store/reducers/authReducer';

import RootNavigator from './navigation/RootNavigator';

//add reducers
const rootReducer = combineReducers({
  auth: authReducer
});

//todo: remove devtools after dev is finished
const store = createStore(rootReducer, applyMiddleware(ReduxThunk),composeWithDevTools());

//fetch fonts
const fetchFont = () => {
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'trajan-pro' : require('./assets/fonts/TrajanPro-Regular.ttf'),
  });
};

export default function App() {
  //load elements
  const [isReady, setIsReady] = useState(false);
  
  if(!isReady){
    return (
      <AppLoading
        startAsync = {fetchFont}
        onFinish = { () => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }

  //render main navigator
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

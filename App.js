import React, { useState } from 'react';
import { YellowBox } from 'react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'; //todo: remove after develop is finished

//todo: import reducers
import authReducer from './store/reducers/authReducer';
import userReducer from './store/reducers/userReducer';

import NavigationContainer from './navigation/NavigationContainer';

//add reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
});

//todo: remove devtools after dev is finished
const store = createStore(rootReducer, applyMiddleware(ReduxThunk),composeWithDevTools());

//fetch fonts
const fetchFont = () => {
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {

  //suppress the irritating timer warning
  YellowBox.ignoreWarnings(['Setting a timer']);

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
      <NavigationContainer />
    </Provider>
  );
};

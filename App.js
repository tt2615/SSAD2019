import React, { useState } from 'react';
import { Image, View, Text, Platform, YellowBox } from 'react-native'
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
import SMReducer from './store/reducers/userReducer';
import challengeReducer from './store/reducers/challengeReducer';
import worldsReducer from './store/reducers/worldsReducer';
import NavigationContainer from './navigation/NavigationContainer';
import mapReducer from './store/reducers/mapReducer';
import questionReducer from './store/reducers/questionReducer';
import challengeQuesReducer from './store/reducers/challengeQuesReducer';
//add reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  sm: SMReducer,
  challenge: challengeReducer,
  worlds: worldsReducer,
  map: mapReducer,
  challengeQues: challengeQuesReducer,
  questions: questionReducer
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

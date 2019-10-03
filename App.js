import React, { useState } from 'react';
import { Image } from 'react-native'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension'; //todo: remove after develop is finished

//todo: import reducers
import accountReducer from './store/reducers/accountReducer';

import RootNavigator from './navigation/RootNavigator';

//add reducers
const rootReducer = combineReducers({
  account: accountReducer
});

//todo: remove devtools after dev is finished
const store = createStore(rootReducer, composeWithDevTools());

//fetch assets
const fetchAssets = () => {
  //load fonts
  const cachedFonts = Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
  //load images
  const images = [
    require('./assets/images/login/title.png'),
    require('./assets/images/backgrounds/1.gif'),
    require('./assets/images/backgrounds/2.gif'),
    require('./assets/images/backgrounds/3.gif'),
    require('./assets/images/backgrounds/4.gif'),
    require('./assets/images/backgrounds/5.gif')
  ];

  const cachedImages = images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

  return Promise.all([...cachedImages,cachedFonts]);

};

export default function App() {

  //load elements
  const [isReady, setIsReady] = useState(false);
  
  if(!isReady){
    return (
      <AppLoading
        startAsync = {fetchAssets}
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

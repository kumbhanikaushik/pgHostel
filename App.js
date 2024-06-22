import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Provider } from 'react-redux'
import MainNavigation from './src/navigator/MainNavigation';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  
    // <MainNavigation />
    );
};

export default App;

const styles = StyleSheet.create({});


// import { View, Text } from 'react-native'
// import React from 'react'

// const App = () => {
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   )
// }

// export default App
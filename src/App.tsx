import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Tabs} from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {checkStorageFolders} from './utils';

export default function App() {
  React.useEffect(() => {
    (async () => {
      await checkStorageFolders();
    })();
  }, []);
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

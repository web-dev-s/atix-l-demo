import * as React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
type ScreenProps = {
  children: React.ReactNode;
  fixed?: boolean;
  containerStyle?: ViewStyle;
};
export const Screen = ({children, fixed, containerStyle}: ScreenProps) => {
  return fixed ? (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <StatusBar
        translucent
        animated={true}
        backgroundColor={'#008efaf3'}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={styles.scrollInner}
      keyboardShouldPersistTaps="handled"
      style={[styles.scrollOuter, containerStyle && containerStyle]}>
      <StatusBar
        translucent
        animated={true}
        backgroundColor={'#008efaf3'}
        barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'}
      />
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  scrollOuter: {
    flexBasis: 1,
  },
  scrollInner: {
    minHeight: '100%',
  },
});

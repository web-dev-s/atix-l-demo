import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FilesLibrary, Upload, ImageGalery} from './screens';
import {Image, ImageSourcePropType} from 'react-native';
import {upload, csv, png} from './assets';

const Tab = createBottomTabNavigator();
const tabIconStyle = {width: 20, height: 20};

const tabBarIcon = (
  props: {focused: boolean; color: string; size: number},
  source: ImageSourcePropType,
) => (
  <Image
    source={source}
    style={[tabIconStyle, {tintColor: props?.color ?? 'green'}]}
    {...props}
  />
);

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Upload'}>
      <Tab.Screen
        name="Files"
        component={FilesLibrary}
        options={{
          tabBarIcon: props => tabBarIcon(props, csv),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: props => tabBarIcon(props, upload),
        }}
      />

      <Tab.Screen
        name="Images"
        component={ImageGalery}
        options={{
          tabBarIcon: props => tabBarIcon(props, png),
        }}
      />
    </Tab.Navigator>
  );
};

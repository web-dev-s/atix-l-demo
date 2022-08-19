/**
 * @format
 */

import 'react-native';
import * as React from 'react';
import {FilesLibrary} from '../src/screens';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-file-access', () => ({
  ...jest.requireActual('react-native-file-access'),
  Dirs: jest.fn(() => '/'),
}));
jest.mock('react-native-context-menu-view', () => ({
  ContextMenu: (actions: any[]) => jest.fn(),
}));

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: () => true,
}));

describe('FilesLibrary screen', () => {
  it('renders correctly', () => {
    console.log('WIP @<ContextMenu mock');
    //  renderer.create(<FilesLibrary />);
  });
});

import * as React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {RenderDocument, Screen} from '../../components';
import {
  DocumentObjectType,
  getStoredCsvs,
  removeFromLibrary,
} from '../../utils';
import {useIsFocused} from '@react-navigation/native';
import ContextMenu from 'react-native-context-menu-view';
import {menu} from '../../assets';
import {styles} from './files.style';

export const FilesLibrary = () => {
  const isFocused = useIsFocused();
  const [csvContent, setCsvContent] = React.useState<DocumentObjectType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getFiles = async () => {
    setLoading(true);
    const docs = await getStoredCsvs();
    const files = docs?.sort((a, b) => a.name.localeCompare(b.name));
    setCsvContent([...files]);
    setLoading(false);
  };

  const clearFilesLibrary = async () => {
    setLoading(true);
    await removeFromLibrary('csv');
    await getFiles();
    setLoading(false);
  };

  const onContextMenuItemPress = (event: {nativeEvent: {index: number}}) => {
    const {index} = event.nativeEvent;
    switch (index) {
      case 0:
        return (async () => await clearFilesLibrary())();
      case 1:
        return (async () => await getFiles())();
      default:
        return;
    }
  };
  React.useEffect(() => {
    if (isFocused) {
      (async () => await getFiles())();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.screenTitleContainer}>
          <Text style={styles.screenTitleText}>{'Files Library'}</Text>
        </View>
        <View style={styles.contextMenuWrapper}>
          <ContextMenu
            actions={[
              {title: 'Remove files from Library'},
              {title: 'Refresh Library files'},
            ]}
            dropdownMenuMode={true}
            previewBackgroundColor={'aliceBlue'}
            onPress={onContextMenuItemPress}>
            <View style={styles.contextMenuButton}>
              {loading ? (
                <ActivityIndicator size="large" color="midnightblue" />
              ) : (
                <Image source={menu} style={[styles.contextMenuButtonIcon]} />
              )}
            </View>
          </ContextMenu>
        </View>
      </View>

      <Screen>
        <View style={styles.container}>
          <View
            style={[
              styles.docsContainer,
              {
                justifyContent:
                  csvContent?.length > 0 ? 'flex-start' : 'center',
              },
            ]}>
            {csvContent?.length > 0 ? (
              csvContent?.map((csv, index) => (
                <RenderDocument key={index} csv={csv} orderNb={index + 1} />
              ))
            ) : (
              <Text style={styles.emptyFolderText}>
                {'No file in Files Library Folder'}
              </Text>
            )}
          </View>
        </View>
      </Screen>
    </View>
  );
};

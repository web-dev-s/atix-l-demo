import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Screen} from '../../components';
import {close, menu} from '../../assets';
import {
  ImageObjectType,
  getStoredPngs,
  removeFromLibrary,
  getFilesFromFolder,
} from '../../utils';
import {useIsFocused} from '@react-navigation/native';
import ContextMenu from 'react-native-context-menu-view';
import {styles} from './images.style';

export const ImageGalery = () => {
  const isFocused = useIsFocused();
  const [pngContent, setPngContent] = React.useState<ImageObjectType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imageFullScreen, setImageFullScreen] = React.useState<
    ImageObjectType | undefined
  >();

  const getImages = async () => {
    setLoading(true);
    const images = await getFilesFromFolder('png');
    setPngContent(images);
    setLoading(false);
  };

  React.useEffect(() => {
    if (isFocused) {
      getImages();
    }
  }, [isFocused]);

  const onImagePressHandler = (it: ImageObjectType) => {
    setImageFullScreen(it);
  };

  const clearImagesLibrary = async () => {
    setLoading(true);
    await removeFromLibrary('png');
    await getImages();
    setLoading(false);
  };

  const onContextMenuItemPress = (event: {nativeEvent: {index: number}}) => {
    const {index} = event.nativeEvent;
    switch (index) {
      case 0:
        return clearImagesLibrary();
      case 1:
        return getImages();
      default:
        return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.screenTitleContainer}>
          <Text style={styles.screenTitleText}>{'Images Galery'}</Text>
        </View>

        <View style={styles.contextMenuWrapper}>
          <ContextMenu
            actions={[
              {title: 'Remove images from Library'},
              {title: 'Refresh Library files'},
            ]}
            dropdownMenuMode={true}
            previewBackgroundColor={'aliceBlue'}
            onPress={onContextMenuItemPress}
            onCancel={() => {
              /*   console.warn('CANCELLED'); */
            }}>
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
      <Screen fixed={Boolean(imageFullScreen)}>
        <View
          style={[
            styles.container,
            {
              justifyContent:
                pngContent?.length > 0 ? 'space-between' : 'center',
            },
          ]}>
          {pngContent?.length > 0 ? (
            <View style={styles.galleryContainer}>
              {pngContent.map((it, idx) => (
                <TouchableOpacity
                  style={styles.imageContainer}
                  key={idx}
                  onPress={() => onImagePressHandler(it)}>
                  <Image style={[styles.image]} source={{uri: it.url}} />
                  <Text style={styles.text}>{it.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyFolderText}>
              {'No files in Images Library Folder'}
            </Text>
          )}
        </View>
      </Screen>
      {imageFullScreen ? (
        <View style={styles.fullscreenContainer}>
          <Image
            style={[styles.imageFullScreen]}
            source={{uri: imageFullScreen.url}}
          />
          <View style={styles.closeButtonContainer}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setImageFullScreen(undefined)}>
              <Image style={[styles.closeButtonImage]} source={close} />
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
};

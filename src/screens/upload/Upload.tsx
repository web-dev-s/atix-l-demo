import {useIsFocused} from '@react-navigation/native';
import * as React from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import DocumentPicker, {
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {upload} from '../../assets';
import {RenderPickedFiles, Screen} from '../../components';
import {addFiles, alertMismatched, isIOS} from '../../utils';
import {styles} from './upload.styles';

const contextMenuActions = [
  {title: 'Open picker for multi selection of CSV files'},
  {title: 'Open picker for multi selection of PNG files'},
  {title: 'Release secure access'},
  {title: 'Clear rendered results'},
];
export const Upload = () => {
  const isFocused = useIsFocused();
  const [result, setResult] = React.useState<
    Array<DocumentPickerResponse> | undefined
  >();
  const [selectionType, setSelectionType] = React.useState<
    'csv' | 'png' | undefined
  >();
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
    setLoading(false);
  };

  const uploadPicked = async (type: 'csv' | 'png') => {
    resetState();
    const forImages = type === 'png';
    setSelectionType(type);
    await DocumentPicker.pickMultiple({
      allowMultiSelection: true,
      type: forImages ? [types.images] : [isIOS ? types.csv : types.allFiles],
      copyTo: 'documentDirectory',
      presentationStyle: 'fullScreen',
      transitionStyle: 'coverVertical',
    })
      .then(async res => {
        setLoading(true);
        setResult(res);

        if (res?.length > 0) {
          if (res.map(i => i.name).some(i => i.indexOf(`.${type}`) === -1)) {
            alertMismatched(type);
          }
          await addFiles[type](res);
        }
        setLoading(false);
      })
      .catch(handleError);
  };

  const releaseSecureAccess = () => {
    DocumentPicker.releaseSecureAccess([])
      .then(() => {
        console.warn('releaseSecureAccess: success');
      })
      .catch(handleError);
  };

  const onContextMenuItemPress = React.useCallback(
    (event: {nativeEvent: {index: number}}) => {
      if (loading) return;
      const {index} = event.nativeEvent;
      switch (index) {
        case 0:
          return uploadPicked('csv');
        case 1:
          return uploadPicked('png');
        case 2:
          return releaseSecureAccess();
        case 3:
          return setResult([]);
        default:
          return;
      }
    },
    [loading],
  );
  const resetState = () => {
    setResult([]);
    setSelectionType(undefined);
  };
  React.useEffect(() => {
    if (!isFocused) {
      resetState();
    }
  }, [isFocused]);
  return (
    <Screen fixed={true} containerStyle={{paddingTop: 5}}>
      {result && result?.length > 0 ? (
        <View style={styles.pickedContainer}>
          <Text style={styles.screenTitleText}>{'Selected files:'}</Text>
          <RenderPickedFiles files={result} type={selectionType} />
        </View>
      ) : null}

      <View style={styles.uploadButtonWrapper}>
        <ContextMenu
          actions={contextMenuActions}
          dropdownMenuMode={true}
          previewBackgroundColor={'#008efaf3'}
          onPress={onContextMenuItemPress}>
          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="midnightblue" />
            ) : (
              <Image source={upload} style={[styles.buttonIcon]} />
            )}
          </View>
        </ContextMenu>
      </View>
    </Screen>
  );
};

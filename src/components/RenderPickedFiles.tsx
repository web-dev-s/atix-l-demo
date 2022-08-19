import * as React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {chevron} from '../assets';
import {formatBytes} from '../utils';

export type RenderPickedFilesProps = {
  files?: Array<DocumentPickerResponse>;
  type?: 'csv' | 'png';
};
export const RenderPickedFiles = (props: RenderPickedFilesProps) => {
  const {files, type} = props;

  return Array.isArray(files) && files?.length > 0 ? (
    <ScrollView
      contentContainerStyle={styles.scrollInner}
      keyboardShouldPersistTaps="handled"
      style={styles.scrollOuter}>
      <View style={styles.filesContainer}>
        {files.map((item, index) => {
          return (
            <RenderPicked
              file={item}
              orderNb={index + 1}
              key={index}
              mismatched={
                [type && type.toString()].indexOf(item?.name?.split('.')[1]) ===
                -1
              }
            />
          );
        })}
      </View>
    </ScrollView>
  ) : null;
};

type RenderPickedProps = {
  file: DocumentPickerResponse;
  orderNb: number;
  mismatched: boolean;
};
const RenderPicked = React.memo((props: RenderPickedProps) => {
  const {file, orderNb, mismatched} = props;
  const [collapsed, setCollapsed] = React.useState<boolean>(true);

  return (
    <View
      style={[
        styles.itemContentContainer,
        {backgroundColor: mismatched ? '#fa000047' : '#2afa0047'},
      ]}>
      <Pressable
        style={styles.itemHeaderContainer}
        onPress={() => {
          setCollapsed(c => !c);
        }}>
        <View style={styles.itemHeaderTextContainer}>
          <Text style={styles.itemHeaderText}>
            {orderNb + '. '}
            {file.name}
          </Text>
        </View>
        <View style={styles.iteamHeaderSizeContainer}>
          <Text style={styles.itemHeaderText}>
            {` [ ${formatBytes(file.size ?? 0, 2)} ]`}
          </Text>
        </View>
        <Image
          style={[
            styles.itemHeaderChevron,
            {
              transform: [{rotate: collapsed ? '0deg' : '180deg'}],
              tintColor: mismatched ? 'firebrick' : 'forestgreen',
            },
          ]}
          source={chevron}
        />
      </Pressable>
      {!collapsed ? (
        <View
          style={[
            styles.itemContentContainer,
            {backgroundColor: mismatched ? '#fa000007' : '#2afa0007'},
          ]}>
          <Text selectable style={styles.text}>
            <Text style={styles.categoryText}>{`Type:  `}</Text> {file.type}
          </Text>
          <Text selectable style={styles.text}>
            <Text style={styles.categoryText}>{`Size:  `}</Text> {file.size}
            {' B'}
          </Text>
          <Text selectable style={styles.text}>
            <Text style={styles.categoryText}>{`Uri:  `}</Text> {file.uri}
          </Text>
          <Text selectable style={styles.text}>
            <Text style={styles.categoryText}>{`File Copy Uri: `}</Text>
            {file.fileCopyUri}
          </Text>
          {file.copyError ? (
            <Text selectable style={[styles.text, {color: 'darkred'}]}>
              <Text
                style={[
                  styles.categoryText,
                  {color: 'red'},
                ]}>{`Copy Error: `}</Text>
              {file.copyError}
            </Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  filesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  text: {
    color: 'black',
    marginVertical: 5,
  },
  scrollOuter: {
    flexBasis: 1,
  },
  scrollInner: {
    minHeight: '100%',
  },

  itemContentContainer: {
    width: '100%',
    minHeight: 30,
    marginBottom: 2,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  itemHeaderContainer: {
    width: '100%',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 30,
  },

  itemHeaderTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  iteamHeaderSizeContainer: {
    maxWidth: 80,
    marginRight: -10,
    flex: 0.3,
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: 'center',
  },
  itemHeaderText: {
    color: 'midnightblue',
    textAlign: 'left',
    fontWeight: '900',
    textAlignVertical: 'center',
    tintColor: 'midnightblue',
  },
  itemHeaderChevron: {
    width: 25,
    height: 25,
    alignSelf: 'center',
    marginHorizontal: 5,
    tintColor: 'forestgreen',
  },
  categoryText: {
    color: 'blue',
    paddingTop: 5,
    textAlign: 'left',
    fontWeight: '600',
  },
});

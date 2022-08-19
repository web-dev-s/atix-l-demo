import {Alert, Platform} from 'react-native';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {Dirs, FileSystem} from 'react-native-file-access';
import {DocumentObjectType, ImageObjectType} from './types';

export const isIOS = Platform.OS === 'ios';

const pathPREFIX = 'file://';
const DEVICE_ACCESS = Dirs.DocumentDir;
export const ROOT_PATH = DEVICE_ACCESS + '/atix';
export const CSV_FILES_PATH = ROOT_PATH + '/csvs';
export const PNG_FILES_PATH = ROOT_PATH + '/pngs';
const TARGET_ROOT_PATH = {
  csv: CSV_FILES_PATH,
  png: PNG_FILES_PATH,
};
export const CSV_CELL_SEPARATOR = ';';
export const CSV_ROW_SEPARATOR = '\n';

console.log('ROOT_PATH: ', ROOT_PATH);

export const checkStorageFolders = async () =>
  new Promise(async resolve => {
    const isRootPath = await FileSystem.isDir(ROOT_PATH);
    console.log('[ FileSystem isRootPath: ', isRootPath, ']');
    if (!isRootPath) {
      FileSystem.mkdir(ROOT_PATH);
    } else {
      const isPngFilesPath = await FileSystem.isDir(PNG_FILES_PATH);
      console.log('[ FileSystem isPngFilesPath: ', isPngFilesPath, ']');
      if (!isPngFilesPath) {
        FileSystem.mkdir(PNG_FILES_PATH);
      }
      const isCsvFilesPath = await FileSystem.isDir(CSV_FILES_PATH);
      console.log('[ FileSystem isCsvFilesPath: ', isCsvFilesPath, ']');
      if (!isCsvFilesPath) {
        FileSystem.mkdir(CSV_FILES_PATH);
      }
    }
    setTimeout(() => resolve(true), 0);
  });

export const addFilesToLibrary =
  (type: 'csv' | 'png') => (res: DocumentPickerResponse[]) =>
    new Promise(resolve => {
      res.forEach(async item => {
        if (item.name.indexOf(`.${type}`) > -1) {
          const targetFilePath: string =
            isIOS && item?.fileCopyUri ? item?.fileCopyUri : item.uri;

          await FileSystem.cp(
            targetFilePath,
            TARGET_ROOT_PATH[type] + '/' + item.name,
          ).catch(err => {
            console.log(`FileSystem ${type} writting error: `, err);
            resolve(err);
          });
        }
      });

      setTimeout(() => resolve(true), 0);
    });

export const addFiles = {
  csv: addFilesToLibrary('csv'),
  png: addFilesToLibrary('png'),
};

export const getFilesFromFolder = (type: 'csv' | 'png') =>
  new Promise<DocumentObjectType[]>(async resolve => {
    const files = await FileSystem.ls(TARGET_ROOT_PATH[type]);

    const resulted: DocumentObjectType[] = [];
    if (files?.length > 0) {
      files.map((file, index) => {
        if (file.indexOf(`.${type}`) > -1) {
          resulted.push({
            name: file?.split('.')[0],
            url: pathPREFIX + TARGET_ROOT_PATH[type] + '/' + file,
          });
        }
        if (index === files.length - 1) {
          resolve(resulted);
        }
      });
    } else {
      resolve(resulted);
    }
  });

export const getStoredCsvs = () => {
  return new Promise<DocumentObjectType[]>(async resolve => {
    const docs: DocumentObjectType[] = await getFilesFromFolder('csv');

    const transformedDocs: DocumentObjectType[] = await readCSVS(docs);

    setTimeout(() => resolve(transformedDocs), 0);
  });
};

/* expensive at large files */
const readCSVS = (docs: any[]) =>
  new Promise<DocumentObjectType[]>(resolve => {
    const transformedDocs: any[] = [];
    if (docs.length > 0) {
      docs.map(async (doc, index) => {
        const csv = await FileSystem.readFile(doc.url, 'utf8');
        const headerExtractor = csv?.split('\n');
        const transfDoc = {
          ...doc,
          header: headerExtractor?.[0],
          data: headerExtractor?.slice(1)?.join('\n'),
        };
        transformedDocs.push(transfDoc);
        if (index === docs.length - 1) {
          resolve(transformedDocs);
        }
      });
    } else resolve(transformedDocs);
  });

export const removeFromLibrary = (type: 'csv' | 'png') =>
  new Promise(async resolve => {
    try {
      const response = await FileSystem.unlink(TARGET_ROOT_PATH[type]);
      await checkStorageFolders();
      resolve(response);
    } catch (ex) {
      resolve(ex);
    }
  });

export const alertMismatched = (type: 'csv' | 'png') => {
  Alert.alert(
    'Mismatched files selected',
    `Some choosen files were't *.${type} files. \nOnly ${type} files will be added in ${
      type == 'csv' ? 'Documents' : 'Images'
    } Folder Library`,
    [{text: 'OK', onPress: () => {}}],
  );
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

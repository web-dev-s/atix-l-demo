import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenTitleContainer: {
    flex: 1,
  },
  contextMenuWrapper: {
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20,
  },
  screenTitleText: {
    color: 'midnightblue',
    paddingVertical: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
    zIndex: 999999,
  },
  docsContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyFolderText: {
    alignSelf: 'center',
    color: 'midnightblue',
    paddingVertical: 15,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
  },
  contextMenuButton: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  contextMenuButtonIcon: {
    width: '50%',
    height: '50%',
    tintColor: '#008efaf3',
  },
});

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
  contextMenuButton: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contextMenuButtonIcon: {
    width: '50%',
    height: '50%',
    tintColor: '#008efaf3',
  },
  screenTitleText: {
    color: 'midnightblue',
    paddingVertical: 20,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
  },
  galleryContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: 20,
  },
  imageContainer: {
    width: 80,
    marginVertical: 15,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    backgroundColor: '#009efa9c',
    padding: 5,
  },
  image: {
    width: '90%',
    marginTop: '10%',
    aspectRatio: 1 / 1,
    borderRadius: 10,
  },
  text: {
    color: 'midnightblue',
    paddingTop: 5,
  },
  emptyFolderText: {
    alignSelf: 'center',
    color: 'midnightblue',
    paddingVertical: 15,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
  },
  fullscreenContainer: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: '#008efaf3',
  },
  imageFullScreen: {
    flex: 1,
    resizeMode: 'contain',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
    tintColor: 'green',
    padding: 10,
  },
  closeButton: {
    flex: 1,
    zIndex: 200,
  },
  closeButtonImage: {
    width: 40,
    height: 40,
    tintColor: 'yellow',
    color: 'yellow',
    zIndex: 0,
  },
});

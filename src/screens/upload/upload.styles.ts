import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screenTitleText: {
    color: 'midnightblue',
    paddingVertical: 2,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
  },
  pickedContainer: {flex: 1, width: '100%'},

  uploadButtonWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    marginVertical: 10,
  },

  buttonContainer: {
    backgroundColor: '#008efaf3',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: '50%',
    height: '50%',
    tintColor: 'midnightblue',
  },
});

import {heightPixel, widthPixel} from '@config/spaces';
import {StyleSheet} from 'react-native';

const dashboardStyle = StyleSheet.create({
  addButtonContainer: {
    position: 'absolute',
    right: widthPixel(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionContainer: {
    borderRadius: 6,
    flexDirection: 'row',
    padding: widthPixel(5),
    alignItems: 'center',
    marginTop: heightPixel(15),
  },
  filterContainer: {
    height: heightPixel(40),
    borderRadius: 8,
    borderWidth: 0.5,
    alignItems: 'center',
    paddingHorizontal: widthPixel(10),
    flexDirection: 'row',
  },
  filterIcon:{
    position: 'absolute',
    right: widthPixel(10)
  },
  sectionList:{
    paddingTop: heightPixel(5)
  },
  sectionListContent:{
    paddingHorizontal: 10,
    paddingBottom: heightPixel(140),
  }
});

export {dashboardStyle};

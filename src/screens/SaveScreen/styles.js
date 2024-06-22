import {StyleSheet} from 'react-native';
import {Colors} from '../../common/styles/color';
import { horizontalScale } from '../../common/styles/styles';

export const styles = StyleSheet.create({
  mainBox: {flex: 1, backgroundColor: '#FFFFFF'},
  modal: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  flatlistMain:{
    marginHorizontal: horizontalScale(15),
    marginVertical: horizontalScale(10),
    borderRadius: horizontalScale(20),
    height: horizontalScale(400),
    overflow: 'hidden',
    backgroundColor: Colors.semiGray,
    elevation: horizontalScale(10),
    shadowOpacity: horizontalScale(20),
    shadowRadius: horizontalScale(25),
  },
  flatlistconatin:{
    height: horizontalScale(230),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageConatiner:{
    height: horizontalScale(200),
    width: horizontalScale(310),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: horizontalScale(10),
    borderRadius: horizontalScale(10),
  },
  imageShow:{
    height: horizontalScale(150),
    width: horizontalScale(310),
    borderRadius: horizontalScale(10),
  },
  imagecount:{
    backgroundColor: Colors.black,
    height: horizontalScale(38),
    width: horizontalScale(75),
    borderRadius: horizontalScale(15),
    marginVertical: horizontalScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  pgrateConatiner:{
    height: horizontalScale(40),
    marginHorizontal: horizontalScale(15),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pgnameConatiner:{
    height: horizontalScale(55),
    marginHorizontal: horizontalScale(15),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  pglocation:{
    height: horizontalScale(80),
    width: '90%',
    marginHorizontal: horizontalScale(15),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  }
});

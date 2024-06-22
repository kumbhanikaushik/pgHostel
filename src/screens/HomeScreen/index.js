import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Images} from '../../common/styles/image';
import React, {useEffect, useState} from 'react';
import {getDataWatcher} from '../../store/action';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {horizontalScale} from '../../common/styles/styles';
import {Colors} from '../../common/styles/color';
import {useIsFocused} from '@react-navigation/native';
import houseList from '../../common/array';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const isFocused = useIsFocused();

  const [bagColor, setbagColor] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  const [storedItems, setStoredItems] = useState([]);

  useEffect(() => {
    fetchStoredData();
  }, [isFocused]);

  const fetchStoredData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("SAVEITEM");
      if (storedData) {
        setStoredItems(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Failed to load stored data:', error);
    }
  };

  const isItemStored = (item) => {
    return storedItems.some(storedItem => storedItem.id === item.id);
  };


  const {getData} = useSelector(state => ({
    getData: state.getDataReducer.getData,
  }));


  const clickData = async item => {
    try {
      const storedData = await AsyncStorage.getItem("SAVEITEM");
      console.log('storedData',storedData);
      const userData = storedData ? JSON.parse(storedData) : [];
  
      const itemIndex = userData.findIndex(x => x.name === item.name);
  
      if (itemIndex > -1) {
        userData.splice(itemIndex, 1);
      } else {
        userData.push(item);
      }
  
      await AsyncStorage.setItem("SAVEITEM", JSON.stringify(userData));
      fetchStoredData()
      console.log('Updated userData:', userData);
    } catch (error) {
      console.error('Error updating AsyncStorage:', error);
    }
  }
  useEffect(() => {
    dispatch(getDataWatcher({accessToken: ''}));
  }, []);

  const RenderData = ({item}) => {
    return (
      <View style={styles.flatlistMain}>
        <View style={styles.flatlistconatin}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            {item?.images.map((itm, index) => (
              <View key={index} style={styles.imageConatiner}>
                <Image
                  source={{
                    uri: `${'https://logiqproperty.blr1.digitaloceanspaces.com/'}${itm}`,
                  }}
                  style={styles.imageShow}
                />
                <View key={index} style={styles.imagecount}>
                  <Text
                    style={{
                      fontSize: horizontalScale(18),
                      color: Colors.white,
                    }}>
                    {index + 1} / {item?.images.length}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{height: horizontalScale(170), width: '100%'}}>
          <View style={styles.pgrateConatiner}>
            <Text
              style={{
                fontSize: horizontalScale(18),
                color: Colors.black,
              }}>
              ₹ {item?.displayPrice?.fixedPrice}
            </Text>
            <Pressable
              onPress={() => clickData(item)}>
            <Image
              source={isItemStored(item) ? Images.heartIcom :  Images.heart}
              // tintColor={'#EF6041'}
              tintColor={isItemStored(item) ? '#FF0000' : '#EF6041'}
              style={{height: horizontalScale(30), width: horizontalScale(30)}}
            />
            </Pressable>
          </View>
          <View style={styles.pgnameConatiner}>
            <Text
              style={{
                fontSize: horizontalScale(18),
                color: Colors.black,
              }}>
              {item?.name}
            </Text>
            <Text
              style={{
                fontSize: horizontalScale(18),
                color: Colors.black,
              }}>
              {item?.company?.companyType?.type}
            </Text>
          </View>
          <View style={styles.pglocation}>
            <Image
              source={Images.locationIcon}
              tintColor={'#EF6041'}
              style={{height: horizontalScale(30), width: horizontalScale(30)}}
            />
            <Text
              style={{
                fontSize: horizontalScale(15),
                color: Colors.black,
                marginHorizontal : horizontalScale(10),
              }}>
              {item?.address?.fullAddress}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainBox}>
      <View style={styles.filterContainer}>
        <View style={styles.filterContain}>
          <Pressable
            onPress={() => setIsVisible(true)}
            style={styles.filetView}>
            <Text style={styles.textFilter}>Filters</Text>
          </Pressable>
          <Pressable
            onPress={() => setIsVisible(true)}
            style={[
              styles.filetView,
              {
                width: horizontalScale(200),
                marginHorizontal: horizontalScale(5),
              },
            ]}>
            <Text style={styles.textFilter}>Type of Property</Text>
          </Pressable>
        </View>
      </View>
      <Text style={{
        fontSize: horizontalScale(18), left: horizontalScale(15), color:'#EF6041'
        }}>97 Results<Text style={{color: Colors.black}}> found for</Text>  Buy <Text style={{color: Colors.black}}> in  </Text>Gandhinager</Text>
      <View style={{flex: 1, marginTop: horizontalScale(25)}}>
        <FlatList
          data={getData?.propertyList}
          renderItem={({item}) => <RenderData item={item} />}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <View style={styles.modelContain}>
              <View style={styles.itemConainer}>
                <Pressable
                  onPress={() => setbagColor(0)}
                  style={[
                    styles.itemContain,
                    {
                      backgroundColor: bagColor === 0 ? '#EF6041' : 'white',
                    },
                  ]}>
                  <Text style={styles.modelText}>{houseList[0]?.name}</Text>
                </Pressable>
                <Pressable
                  onPress={() => setbagColor(1)}
                  style={[
                    styles.itemContain,
                    {
                      backgroundColor: bagColor === 1 ? '#EF6041' : 'white',
                      marginHorizontal: horizontalScale(15),
                    },
                  ]}>
                  <Text style={styles.modelText}>{houseList[1]?.name}</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.modelContain}>
              <View style={styles.itemConainer}>
                <Pressable
                  onPress={() => setbagColor(2)}
                  style={[
                    styles.modelItemShow,
                    {
                      backgroundColor: bagColor === 2 ? '#EF6041' : 'white',
                    },
                  ]}>
                  <Text style={styles.modelText}>{houseList[2]?.name}</Text>
                </Pressable>
                <Pressable
                  onPress={() => setbagColor(3)}
                  style={[
                    styles.modelItemShow,
                    {
                      backgroundColor: bagColor === 3 ? '#EF6041' : 'white',
                      marginHorizontal: horizontalScale(5),
                    },
                  ]}>
                  <Text style={styles.modelText}>{houseList[3]?.name}</Text>
                </Pressable>
                <Pressable
                  onPress={() => setbagColor(4)}
                  style={[
                    styles.modelItemShow,
                    {
                      backgroundColor: bagColor === 4 ? '#EF6041' : 'white',
                    },
                  ]}>
                  <Text style={styles.modelText}>{houseList[4]?.name}</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.modelContain}>
              <View style={styles.cloaseContainer}>
                <Pressable
                  onPress={() => setIsVisible(false)}
                  style={styles.closeModel}>
                  <Text style={styles.textFilter}>Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={() => setIsVisible(false)}
                  style={styles.applyModel}>
                  <Text style={[styles.textFilter, {color: Colors.white}]}>
                    Apply
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

// import { View, Text } from 'react-native'
// import React from 'react'

// const SaveScreen = () => {
//   return (
//     <View>
//       <Text>SaveScreen</Text>
//     </View>
//   )
// }

// export default SaveScreen

import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Images} from '../../common/styles/image';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import {horizontalScale} from '../../common/styles/styles';
import {Colors} from '../../common/styles/color';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SaveScreen = () => {
  const isFocused = useIsFocused();

  const [saveData, setSaveData] = useState([]);

  useEffect(() => {
    saveDataGet();
  }, [isFocused]);

  const saveDataGet = async () => {
    const userData = JSON.parse(await AsyncStorage.getItem('SAVEITEM'));
    console.log('userDatauserDatauserData',userData);
    setSaveData(userData);
  };

  const isItemStored = (item) => {
    return saveData.some(storedItem => storedItem.id === item.id);
  };


  const clickData = async item => {
    try {
      const storedData = await AsyncStorage.getItem('SAVEITEM');
      const userData = storedData ? JSON.parse(storedData) : [];

      const itemIndex = userData.findIndex(x => x.name === item.name);

      if (itemIndex > -1) {
        userData.splice(itemIndex, 1);
      } else {
        userData.push(item);
      }
      await AsyncStorage.setItem('SAVEITEM', JSON.stringify(userData));
      setSaveData(userData);
      console.log('Updated userData:', userData);
    } catch (error) {
      console.error('Error updating AsyncStorage:', error);
    }
  };

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
            <Pressable onPress={() => clickData(item)}>
              {/* <Image
                source={Images.heart}
                tintColor={'#EF6041'}
                style={{
                  height: horizontalScale(30),
                  width: horizontalScale(30),
                }}
              /> */}
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
        <Text style={{
        fontSize: horizontalScale(18), left: horizontalScale(15), color:'#EF6041', marginTop: horizontalScale(20)
        }}>Dear Sanjay Chaudhary, <Text style={{color: Colors.black}}> here are your liked properties</Text></Text>
        <View style={{flex: 1, marginTop: horizontalScale(25)}}>
          {saveData?.length == 0 ? (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{fontSize: horizontalScale(20), fontWeight:'600'}}>Not Favorite Item Select</Text>
              </View>
          ) : (
            <FlatList
              data={saveData}
              renderItem={({item}) => <RenderData item={item} />}
            />
          )}
        </View>
      </View>
  );
};

export default SaveScreen;

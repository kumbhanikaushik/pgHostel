// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import React from 'react'
// import { Image, StyleSheet, Text, View } from 'react-native';
// import { Colors } from '../../common/styles/color';
// import { Images } from '../../common/styles/image';
// import HomeScreen from '../../screens/HomeScreen';
// // import { FontFamily } from '../../common/styles/font';

// const BottomNavigation = () => {
//     const Tab = createBottomTabNavigator();

//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="Search" component={HomeScreen} options={{
//                 header: (props) => (
//                     <View style={styles.headerStyle}>
//                         <Text style={styles.title}>Hello Renzo!</Text>
//                         <Text style={styles.description}>Are you ready to dance?</Text>
//                     </View>
//                 ),
//                 tabBarIcon: () => (
//                     <Image style={styles.tabBarIconStyle} source={Images.search} />
//                 ),
//                 tabBarLabelStyle: {
//                     color: Colors.black,
//                     fontSize: 10,
//                     // fontFamily: FontFamily.RobotoRegular
//                 }
//             }} />
//             <Tab.Screen name="Events" component={HomeScreen} options={{
//                 header: (props) => (
//                     <View style={styles.headerStyle}>
//                         <Text style={styles.title}>Hello Renzo!</Text>
//                         <Text style={styles.description}>Are you ready to dance?</Text>
//                     </View>
//                 ),
//                 tabBarIcon: () => (
//                     <Image style={styles.tabBarIconStyle} source={Images.calendar} />
//                 ),
//                 tabBarLabelStyle: {
//                     color: Colors.black,
//                     fontSize: 10,
//                     // fontFamily: FontFamily.RobotoRegular,
//                 }
//             }} />
//             <Tab.Screen name="Favourites" component={HomeScreen} options={{
//                 header: (props) => (
//                     <View style={styles.headerStyle}>
//                         <Text style={styles.title}>Hello Renzo!</Text>
//                         <Text style={styles.description}>Are you ready to dance?</Text>
//                     </View>
//                 ),
//                 tabBarIcon: () => (
//                     <Image style={styles.tabBarIconStyle} source={Images.heart} />
//                 ),
//                 tabBarLabelStyle: {
//                     color: Colors.black,
//                     fontSize: 10,
//                     // fontFamily: FontFamily.RobotoRegular
//                 }
//             }} />
//             <Tab.Screen name="Profile" component={HomeScreen} options={{
//                 header: (props) => (
//                     <View style={styles.headerStyle}>
//                         <Text style={styles.title}>Hello Renzo!</Text>
//                         <Text style={styles.description}>Are you ready to dance?</Text>
//                     </View>
//                 ),
//                 tabBarIcon: () => (
//                     <Image style={styles.tabBarIconStyle} source={Images.user} />
//                 ),
//                 tabBarLabel: "Profile",
//                 tabBarLabelStyle: {
//                     color: Colors.black,
//                     fontSize: 10,
//                     // fontFamily: FontFamily.RobotoRegular
//                 }
//             }} />
//         </Tab.Navigator>
//     )
// }

// export default BottomNavigation;

// const styles = StyleSheet.create({
//     tabBarIconStyle: { height: 24, width: 24 },
//     headerStyle: { backgroundColor: Colors.white, padding: 20 },
//     title: { color: Colors.black, fontSize: 26,
//         //  fontFamily: FontFamily.GothicA1SemiBold
//         },
//     description: { color: "#747474", fontSize: 16,
//         // fontFamily: FontFamily.GothicA1Regular
//         }
// })

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeStack,
  WorkStack,
  LeaveStack,
  HolidayStack,
} from './StackNavigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../../screens/HomeScreen';
import CityExpert from '../../screens/CityExpert';
import SaveScreen from '../../screens/SaveScreen';
import InvestorScreen from '../../screens/InvestorScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import {Images} from '../../common/styles/image';
import {Image, Text} from 'react-native'; // Import Text from react-native

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato', // Color of the active tab text
        inactiveTintColor: 'gray', // Color of inactive tab text
        style: {
          borderTopWidth: 1, // Top border for the tab bar
          borderTopColor: 'lightgray', // Color of the top border
        },
        labelStyle: {
          fontSize: 14, // Font size for the tab labels
          fontWeight: 'bold', // Font weight for the tab labels
        },
        tabStyle: {
          paddingBottom: 5, // Padding at the bottom of each tab
        },
        indicatorStyle: {
          backgroundColor: 'tomato', // Color of the bottom line indicator
          height: 3, // Height of the bottom line indicator
        },
      }}
      screenOptions={({route}) => ({
        headerTitleAlign: 'center',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? Images.home : Images.home;
          } else if (route.name === 'CityExpert') {
            iconName = focused ? Images.users : Images.users;
          } else if (route.name === 'Save') {
            iconName = focused ? Images.heart : Images.heart;
          } else if (route.name === 'Investor') {
            iconName = focused ? Images.investor : Images.investor;
          } else if (route.name === 'Profil') {
            iconName = focused ? Images.profil : Images.profil;
          }
          return (
            <Image
              tintColor={focused ? 'tomato' : 'grey'}
              source={iconName}
              style={{height: 20, width: 20}}
            />
          );
        },
        tabBarLabel: (
          {focused, color}, // Customize label component
        ) => (
          <Text
            style={{
              fontSize: focused ? 14 : 12,
              color: focused ? 'tomato' : 'grey',
            }}>
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'grey',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="CityExpert"
        component={CityExpert}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Save"
        component={SaveScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Investor"
        component={InvestorScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { HomeStack, WorkStack, LeaveStack, HolidayStack } from './StackNavigation';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import HomeScreen from '../../screens/HomeScreen';
// import CityExpert from '../../screens/CityExpert';
// import SaveScreen from '../../screens/SaveScreen';
// import InvestorScreen from '../../screens/InvestorScreen';
// import ProfileScreen from '../../screens/ProfileScreen';
// import { Images } from '../../common/styles/image';
// import { Image } from 'react-native';

// const Tab = createBottomTabNavigator();

// export default function BottomTabNavigation() {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 headerTitleAlign: 'center',
//                 tabBarIcon: ({ color, size }) => {
//                   let iconName;

//                   if (route.name === 'Home') {
//                     iconName = Images.home
//                   } else if (route.name === 'CityExpert') {
//                     iconName = Images.users
//                   } else if (route.name === 'Save') {
//                     iconName = Images.heart
//                   } else if (route.name === 'Investor') {
//                     iconName = Images.investor
//                   } else if (route.name === 'Profil') {
//                     iconName = Images.profil
//                   }
//                   return <Image source={iconName} style={{height:20, width:20}} />
//                 },
//                 tabBarActiveTintColor: 'tomato',
//                 tabBarInactiveTintColor: 'grey',
//             })}
//         >
//             <Tab.Screen  name='Home' component={HomeScreen} options={{ headerShown: false }} />
//             <Tab.Screen name='CityExpert' component={CityExpert} options={{ headerShown: false }} />
//             <Tab.Screen name='Save' component={SaveScreen} options={{ headerShown: false }} />
//             <Tab.Screen name='Investor' component={InvestorScreen} options={{ headerShown: false }} />
//             <Tab.Screen name='Profil' component={ProfileScreen} options={{ headerShown: false }} />
//         </Tab.Navigator>
//     );
// }

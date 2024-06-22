import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import BottomNavigation from '../BottomNavigation';

const MainNavigation = () => {
    const Stack = createNativeStackNavigator();
    // const {userData} = useSelector(state => ({
    //     userData: state.authReducer.userData,
    // }));
    return (
            <NavigationContainer>
                <Stack.Navigator 
                screenOptions={{
                    headerShown: false
                }}>
                    {/* {!userData.token ? (
                        <Stack.Screen name="Login" component={LoginScreen} />
                    ) : (
                        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
                    )} */}
                    <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
                </Stack.Navigator>
            </NavigationContainer>
    )
}

export default MainNavigation;
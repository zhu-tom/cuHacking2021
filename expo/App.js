/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import '@react-navigation/native/'
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as Permissions from 'expo-permissions';

import WelcomeScreen from './components/WelcomeScreen';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import HomeTab from './components/HomeTab';
import ProfileTab from './components/ProfileTab';

import {Ionicons} from '@expo/vector-icons';
import { auth } from './firebase/firebase';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    auth.onAuthStateChanged(u => {
      setUser(u);
      console.log("authstatechange");
    });
  }, []);
  const [permission, askForPermission] = Permissions.usePermissions(Permissions.CAMERA, { ask: true});

  if (!permission || permission.status !== 'granted') {
    return (
      <View>
        <Text>Permission is not granted</Text>
        <Button title="Grant permission" onPress={askForPermission} />
      </View>
    );
  }

  

  console.log(user);


  return (
      <SafeAreaView style={styles.container}>
          <NavigationContainer>
            {user == null ? 
              (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                  />
                  <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                  />
                  <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                  />
                </Stack.Navigator>
              ) :
              (
                <Tab.Navigator 
                  screenOptions={({route}) => {
                    return ({
                      tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name == "Home") {
                          iconName = focused ? 'home' : 'home-outline'
                        } else if (route.name == "Profile") {
                          iconName = focused ? 'person' : 'person-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                      }
                    })
                }}>
                  <Tab.Screen name="Home" component={HomeTab}/>
                  <Tab.Screen name="Profile" component={ProfileTab}/>
                </Tab.Navigator>
              )}  
          </NavigationContainer>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

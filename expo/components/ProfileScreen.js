import React from 'react';
import { Button, Text, View } from 'react-native';
import { auth } from '../firebase/firebase';

const ProfileScreen = () => {
  //database
  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 24}}>Hello, {}</Text>
      <Text style={{fontSize: 16}}>Email {auth.currentUser.email}</Text>
      <Button title="Log Out" onPress={() => auth.signOut()}/>
    </View>
  )
}

export default ProfileScreen;
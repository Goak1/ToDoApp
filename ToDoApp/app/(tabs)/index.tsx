import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {style} from './Style/TaskStyle.js';
import UserProfile from '../../assets/images/UserProfile.png';

export default function app(){
  return (
    <View style={style.container}>
      <View style={style.profileView}>
        <View>
            <Image source={UserProfile} style={style.UserProfile}/>
        </View>
        <View style={style.profileDetail}>
            <Text style={style.text}>Task Manager</Text>
            <Text style={style.taskText}>Task Manager</Text>
        </View>
      </View>
      
    </View>
  )
}



import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useRoute, Route } from '@react-navigation/native';
import { io } from 'socket.io-client';
import { 
  SafeAreaView, 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import itsamatch from '../assets/itsamatch.png';

interface User {
  _id: string;
  name: string;
  avatar: string;
  bio: string;
}

interface UserParams {
  user: string;
}

export default function Main() {
  const navigation = useNavigation();
  const route = useRoute<Route<'Login', UserParams>>();
  const [match, setMatch] = useState(false);
  const [matchDev, setMatchDev] = useState<User>();

  const { user: id } = route.params;
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {  
          user: id
        }
      });
      
      setUsers(response.data);
    }

    const socket = io('http://192.168.100.14:3333', {
      query: {
        user: id
      }
    });

    socket.on('match', (dev: User) => {
      setMatchDev(dev);
      setMatch(true);
    });

    loadUsers();

    return () => { socket.disconnect() }
  }, [id]);

  async function handleLike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: id }
    });

    setUsers(rest);
  }

  async function handleDislike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: id }
    });

    setUsers(rest);
  }

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
  <SafeAreaView style={styles.container}>
    <TouchableOpacity onPress={handleLogout}>
      <Image source={logo} style={styles.logo}/>
    </TouchableOpacity>
    
    {users.length !== 0 ? (
      <View style={styles.cardsContainer}>
        {users.map((user, index )=> (
          <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
            <Image style={styles.avatar} source={{ uri: user.avatar }} />

            <View style={styles.footer}>
              <Text style={styles.name}>{user.name}</Text>
              <Text numberOfLines={3} style={styles.bio}>{user.bio}</Text>
            </View>
          </View>
        ))}
      </View>
    ): <Text style={styles.empty}>Sem devs no momento!</Text> }
    
    {users.length !== 0 && (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDislike}>
          <Image source={dislike} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLike}>
          <Image source={like} />
        </TouchableOpacity>
      </View>
    )}

    {match && matchDev && (
      <View style={[styles.matchContainer, { zIndex: users.length + 1 }]}>
        <Image style={styles.matchImage} source={itsamatch} />
        <Image style={styles.matchAvatar} source={{ uri: matchDev.avatar}} />

        <Text style={styles.matchName}>{matchDev.name}</Text>
        <Text style={styles.matchBio}>{matchDev.bio}</Text>

        <TouchableOpacity onPress={() => setMatch(false)}>
          <Text style={styles.closeMatch}>Fechar</Text>
        </TouchableOpacity>
      </View>
    )}
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  logo: {
    marginTop: 20
  },

  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500
  },

  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  avatar: {
    flex: 1,
    height: 300,
    backgroundColor: '#DDD'
  },

  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },

  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    }
  },

  empty:{
    flex: 1,
    fontSize: 24,
    color: '#999',
    fontWeight: 'bold',
    textAlignVertical: 'center'
  },

  matchContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2
  },

  matchImage: {
    height: 60,
    resizeMode: 'contain'
  },

  matchAvatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 5,
    borderColor: '#FFF',
    marginVertical: 30
  },

  matchName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF'
  },

  matchBio: {
    marginTop: 10,
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 30
  },

  closeMatch: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold'
  }
});
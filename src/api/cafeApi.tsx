import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://cafe-react-native-fh.herokuapp.com/api';

const cafeApi = axios.create({baseURL});

cafeApi.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    config.headers['x-token'] =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTViMWUxMjJmMGJjNmIxNDY1YjY1MGEiLCJpYXQiOjE2MzYxMjAyMzUsImV4cCI6MTYzNjcyNTAzNX0.ru0WP3lFGlrAdrcJN9srsTnOuSi2AhIaapKWdcWPKmA';
  }
  return config;
});

export default cafeApi;

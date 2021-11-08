/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {useContext, useEffect} from 'react';

import {
  View,
  Platform,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import Background from '../components/Background';
import WhiteLogo from '../components/WhiteLogo';
import {useForm} from '../hooks/useForm';
import {loginstyles} from '../themes/loginThemes';
import {AuthContext} from '../context/AuthContext';

interface Props extends NativeStackScreenProps<any, any> {}

const LoginScreen = ({navigation}: Props) => {
  const {signIn, errorMessage, removeError} = useContext(AuthContext);
  const {email, password, onChange} = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }
    Alert.alert('Login incorrecto', errorMessage, [
      {text: 'Esta bien', onPress: removeError},
    ]);
  }, [errorMessage]);

  const onLogin = () => {
    console.log(email, password);
    Keyboard.dismiss();
    signIn({correo: email, password});
  };

  return (
    <>
      {/*  */}
      <Background />
      {/*  */}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginstyles.formContainer}>
          <WhiteLogo />

          <Text style={loginstyles.title}>Login</Text>
          <Text style={loginstyles.label}>Login</Text>

          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginstyles.inputField,
              Platform.OS === 'ios' && loginstyles.inputFieldIos,
            ]}
            selectionColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
          />

          <Text style={loginstyles.label}>Password</Text>

          <TextInput
            placeholder="********************************"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            underlineColorAndroid="white"
            style={[
              loginstyles.inputField,
              Platform.OS === 'ios' && loginstyles.inputFieldIos,
            ]}
            selectionColor="white"
            onChangeText={value => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            secureTextEntry={true}
          />
          <View style={loginstyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginstyles.button}
              onPress={onLogin}>
              <Text style={loginstyles.textButton}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={loginstyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={loginstyles.textButton}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;

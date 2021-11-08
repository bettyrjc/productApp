/* eslint-disable react-native/no-inline-styles */
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import WhiteLogo from '../components/WhiteLogo';
import {AuthContext} from '../context/AuthContext';
import {useForm} from '../hooks/useForm';
import {loginstyles} from '../themes/loginThemes';

interface Props extends NativeStackScreenProps<any, any> {}

const RegisterScreen = ({navigation}: Props) => {
  const {signUp, errorMessage, removeError} = useContext(AuthContext);

  const {email, password, name, onChange} = useForm({
    email: '',
    name: '',
    password: '',
  });

  const onRegister = () => {
    console.log('register', email, password, name);
    Keyboard.dismiss();
    signUp({correo: email, password, nombre: name});
  };

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert('Registro incorrecto', errorMessage, [
      {
        text: 'Ok',
        onPress: removeError,
      },
    ]);
  }, [errorMessage]);
  return (
    <>
      {/*  */}
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#5856d6'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={loginstyles.formContainer}>
          <WhiteLogo />

          <Text style={loginstyles.title}>Register</Text>
          <Text style={loginstyles.label}>Name</Text>

          <TextInput
            placeholder="Ingrese su nombre"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            underlineColorAndroid="white"
            style={[
              loginstyles.inputField,
              Platform.OS === 'ios' && loginstyles.inputFieldIos,
            ]}
            selectionColor="white"
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={value => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
          />
          <Text style={loginstyles.label}>Email</Text>

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
            onSubmitEditing={onRegister}
          />

          <Text style={loginstyles.label}>password</Text>

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
            onSubmitEditing={onRegister}
            secureTextEntry={true}
          />
          <View style={loginstyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginstyles.button}
              onPress={onRegister}>
              <Text style={loginstyles.textButton}>Register</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('LoginScreen')}
            style={loginstyles.buttonReturn}>
            <Text style={loginstyles.textButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default RegisterScreen;

import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useState } from 'react'
import { Link, Stack } from 'expo-router';

import Button from '@/src/components/Button';
import Colors from '@/src/constants/Colors';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    // sign user in
    console.warn('Sign in: ', email, password);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign in' }}/>

      <Text style={styles.label}>Email</Text>
      <TextInput 
        value={email}
        onChangeText={setEmail}
        placeholder='jon@gmail.com' 
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput 
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
      />

      <Button text='Sign in' onPress={signIn}/>

      <Link href='/sign-up' style={styles.textButton}>
        Create an account
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderColor: 'gainsboro',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20
  },
  label: {
    color: 'gray',
    fontSize: 16
  },
  textButton: {
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    color: Colors.light.tint,
  }
});

export default SignInScreen
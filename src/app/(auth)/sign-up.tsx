import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { useState } from 'react'
import { Link, Stack } from 'expo-router';

import Button from '@/src/components/Button';
import Colors from '@/src/constants/Colors';
import { supabase } from '@/src/lib/supabase';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign up' }}/>

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

      <Button
        text={loading ? 'Creating account...' : 'Create account'} 
        disabled={loading} 
        onPress={signUpWithEmail}
      />
      
      <Link href='/sign-in' style={styles.textButton}>
        Sign in
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

export default SignUpScreen
import { View, Text, Button, Alert } from 'react-native'

import { supabase } from '@/src/lib/supabase'
import { useRouter } from 'expo-router'

const ProfileScreen = () => {
	const router = useRouter();

  return (
	<View>
	  <Text>Profile</Text>

	  <Button 
			title='Sign out' 
			onPress={async () => 
				{
					const { error } = await supabase.auth.signOut()
					if (error) Alert.alert(error.message);
					router.push('/sign-in');
				}
			}
		/>
	</View>
  )
}

export default ProfileScreen
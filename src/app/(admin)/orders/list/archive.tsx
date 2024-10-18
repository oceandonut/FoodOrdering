import { Stack } from 'expo-router';
import { ActivityIndicator, FlatList, Text } from 'react-native';

import OrderListItem from '@/src/components/OrderListItem';
import { useAdminOrderList } from '@/src/api/orders';

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({ archived: true });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch orders</Text>
  }
  
  return (
    <>
      <Stack.Screen         
        options={{
          title: 'Archive',
        }}/>
      <FlatList 
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item}/>}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
    </>
  );
}

import { Stack } from 'expo-router';
import { FlatList, Text, ActivityIndicator } from 'react-native';

import OrderListItem from '@/src/components/OrderListItem';
import { useMyOrderList } from '@/src/api/orders';

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useMyOrderList();

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
          title: 'Orders',
        }}/>
      <FlatList 
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item}/>}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
    </>
  );
}

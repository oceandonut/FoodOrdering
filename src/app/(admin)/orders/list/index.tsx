import { ActivityIndicator, FlatList, Text } from 'react-native';
import { Stack } from 'expo-router';

import OrderListItem from '@/src/components/OrderListItem';
import { useAdminOrderList } from '@/src/api/orders';
import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';

export default function OrdersScreen() {
  const { data: orders, isLoading, error } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

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
          title: 'Active',
        }}/>
      <FlatList 
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item}/>}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
    </>
  );
}

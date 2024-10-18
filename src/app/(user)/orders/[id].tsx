import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native"

import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useOrderDetails } from "@/src/api/orders";

const OrderDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch order details</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }}/>

      <OrderListItem order={order} />
      <FlatList 
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem orderItem={item}/>}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    flex: 1
  }
})
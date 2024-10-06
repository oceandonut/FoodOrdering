import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native"

import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import OrderItemListItem from "@/src/components/OrderItemListItem";

const OrderDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const order = orders.find((o) => o.id.toString() === id);
  
  if (!order)
    return <Text>Order not found</Text>;

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
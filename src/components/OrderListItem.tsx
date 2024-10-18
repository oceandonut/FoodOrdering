import { View, Pressable, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Tables } from '@/src/types';

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Tables<'orders'>
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  return (
    <Link href={`/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.orderNumber}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </Pressable>
    </Link>
  )
}

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  orderNumber: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray'
  },
  status: {
    fontWeight: '500',
  }
});
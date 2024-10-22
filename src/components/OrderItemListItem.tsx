import { View, Text, StyleSheet, Image } from 'react-native'

import { Tables } from '@/src/types'
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';

type OrderItemListItemProps = {
  item: {products: Tables<'products'>} & Tables<'order_items'>
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  if (!item) {
    return <Text>Failed to fetch order details</Text>
  }

  const product = item.products;

  return (
    <View style={styles.container}>
      <View style={styles.productInfo}>
        <Image 
          style={styles.image}
          source={{ uri: product.image || defaultPizzaImage }}
          resizeMode='contain'
        />
        <View>
          <Text style={styles.name}>{product.name}</Text>
          <View style={styles.subtitle}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.size}>Size: {item.size}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.quantity}>{item.quantity}</Text>
    </View>
  )
}

export default OrderItemListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: 75,
    aspectRatio: 1,
    marginRight: 10
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  subtitle: {
    flexDirection: 'row'
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
    marginRight: 5
  },
  size: {
    fontWeight: '500'
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18
  }
})
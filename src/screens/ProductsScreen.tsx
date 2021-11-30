/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState, useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ProductsContext} from '../context/ProductsContext';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {AuthContext} from '../context/AuthContext';
import {loginstyles} from '../themes/loginThemes';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}

const ProductsScreen = ({navigation}: Props) => {
  const {products, loadProducts} = useContext(ProductsContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {logOut} = useContext(AuthContext);
  console.log(products[1]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 10}}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity activeOpacity={0.8} onPress={logOut}>
          <Text
            style={{
              color: '#5856d6',
              marginRight: 15,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const loadProductsFromBack = async () => {
    setIsRefreshing(true);
    await loadProducts();
    setIsRefreshing(false);
  };

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        keyExtractor={p => p._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('ProductScreen', {
                id: item._id,
                name: item.nombre,
              })
            }>
            <View style={styles.card}>
              <Text style={styles.productName}>{item.nombre}</Text>
              <Text style={styles.productPrice}>{item.precio} USD</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={loadProductsFromBack}
          />
        }
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
  },
  productPrice: {
    fontSize: 16,
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 14,
  },
});

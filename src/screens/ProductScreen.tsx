import React, {useEffect, useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
} from 'react-native';
import useCategories from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

const ProductScreen = ({route, navigation}: Props) => {
  const {id = '', name = ''} = route.params;
  const [tempUri, setTempUri] = useState(null);

  const {categories} = useCategories();
  const {loadProductById, updateProduct, uploadImage, addProducts} =
    useContext(ProductsContext);

  const {_id, categoriaId, nombre, img, setFormValueValue, onChange} = useForm({
    _id: id,
    categoriaId: '',
    nombre: name,
    img: '',
  });

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Nombre del producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    if (id.length === 0) return;
    const product = await loadProductById(id);
    setFormValueValue({
      _id: id,
      categoriaId: product.categoria._id,
      img: product.img || '',
      nombre,
    });
  };
  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaId, nombre, id);
    } else {
      const tempCategoriaId = categoriaId || categories[0]._id;
      const newProduct = await addProducts(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  const takeFoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) return;
        if (!response?.assets[0]?.uri) return;

        const uri = response.assets[0].uri;
        if (uri) setTempUri(uri);
        uploadImage(response, id);
      },
    );
  };

  const takeFotoFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (response.didCancel) return;
        if (!response?.assets[0]?.uri) return;

        const uri = response.assets[0].uri;
        if (uri) setTempUri(uri);
        uploadImage(response, id);
      },
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto</Text>
        <TextInput
          style={styles.input}
          placeholder="Producto"
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
        />

        <Text style={styles.label}>Categoria</Text>
        <Picker
          selectedValue={categoriaId}
          onValueChange={itemValue => onChange(itemValue, 'categoriaId')}>
          {categories.map(categorie => (
            <Picker.Item
              label={categorie.nombre}
              value={categorie._id}
              key={categorie._id}
            />
          ))}
        </Picker>
        <Button title="Guardar" color="#5856d6" onPress={saveOrUpdate} />
        {_id.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}>
              <Text style={{marginTop: 5}}>
                <Icon name="camera-outline" size={25} color="#5856d6" />
              </Text>
              <Button title="Cámara" color="#5856d6" onPress={takeFoto} />
            </View>
            <View style={{width: 10}}></View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginLeft: 20,
              }}>
              <Text style={{marginTop: 5}}>
                <Icon
                  name="file-tray-stacked-outline"
                  size={25}
                  color="#5856d6"
                />
              </Text>
              <Button
                title="Galeria"
                color="#5856d6"
                onPress={takeFotoFromGallery}
              />
            </View>
          </View>
        )}
      </ScrollView>
      {img.length > 0 && !tempUri && (
        <Image source={{uri: img}} style={{width: '100%', height: 300}} />
      )}
      {/* TODO: mostrar imagen temporal */}
      {tempUri && (
        <Image source={{uri: tempUri}} style={{width: '100%', height: 300}} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 25,
  },
  label: {
    fontSize: 14,
    color: '#5856D6',
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.4)',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
});
export default ProductScreen;

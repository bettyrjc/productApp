/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Producto, ProductsResponse} from '../interfaces/appInterfaces';
import {useState} from 'react';
import cafeApi from '../api/cafeApi';
// import {ImagePickerRespose} from 'react-native-image-picker';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProducts: (categorieID: string, productName: string) => Promise<Producto>;
  updateProduct: (
    categorieID: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>;
};
export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({children}: any) => {
  const [products, setProducts] = useState<Producto[]>([]);

  const loadProducts = async () => {
    const resp = await cafeApi.get<ProductsResponse>('/productos?limite=50');
    setProducts([...resp.data.productos]);
  };

  const addProducts = async (
    categorieID: string,
    productName: string,
  ): Promise<Producto> => {
    const resp = await cafeApi.post<Producto>('/productos', {
      nombre: productName,
      categoria: categorieID,
    });
    setProducts([...products, resp.data]);
    return resp.data;
  };

  const updateProduct = async (
    categorieID: string,
    productName: string,
    productId: string,
  ) => {
    const resp = await cafeApi.put<Producto>(`/productos/${productId}`, {
      nombre: productName,
      categoria: categorieID,
    });
    setProducts(
      products.map(prod => {
        return prod._id === productId ? resp.data : prod;
      }),
    );
  };

  const deleteProduct = async (id: string) => {};

  const uploadImage = async (data: any, id: string) => {
    const {uri, type, fileName} = data.assets[0];
    const fileToUpload = {
      uri,
      type,
      name: fileName,
    };
    const formData = new FormData();
    formData.append('archivo', fileToUpload);
    console.log(fileToUpload);

    try {
      const resp = await cafeApi.put(`/uploads/productos/${id}`, formData);

      console.log('resp', resp);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProductById = async (id: string): Promise<Producto> => {
    const resp = await cafeApi.get<Producto>(`/productos/${id}`);
    return resp.data;
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProducts,
        updateProduct,
        deleteProduct,
        loadProductById,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

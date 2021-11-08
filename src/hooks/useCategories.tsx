import React, {useState, useEffect} from 'react';
import cafeApi from '../api/cafeApi';
import {CategoriesResponse, Categoria} from '../interfaces/appInterfaces';

const useCategories = () => {
  const [loading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Categoria[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const resp = await cafeApi.get<CategoriesResponse>('categorias');
    setCategories(resp.data.categorias);
    setIsLoading(false);
  };
  return {loading, categories};
};

export default useCategories;

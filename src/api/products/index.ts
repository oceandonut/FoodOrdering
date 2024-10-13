import { supabase } from '@/src/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export const useProductList = () => {
  return useQuery({ // tanstack fn
    queryKey: ['products'], // identifier for different queries in cache
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        throw new Error(error.message); // need to throw error to let tanstack know an error happened
      }
      return data;
    }
  });
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  });
}
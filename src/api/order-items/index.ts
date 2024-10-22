import { useMutation } from '@tanstack/react-query';

import { supabase } from '@/src/lib/supabase';
import { InsertTables } from '@/src/types';

export const useInsertOrderItems = () => {
    return useMutation({
      async mutationFn(items: InsertTables<'order_items'>) {
        const { error } = await supabase
          .from('order_items')
          .insert(items)
          .select();
  
        if (error) {
          throw new Error(error.message);
        }

      },
      onError(error) {
        console.log(error)
      }
    });
  }
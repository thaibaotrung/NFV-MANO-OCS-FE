import { QueryClient } from '@tanstack/react-query';
import { loadingSlice } from '../redux/slices/loading-slice';
import { store } from '../redux/store';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onMutate: () => {
        console.log('mutate');
        store.dispatch(loadingSlice.actions.showLoading());
      },
      onSettled: () => {
        console.log('settled');
        store.dispatch(loadingSlice.actions.hideLoading());
      }
    }
  }
});

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteBooking as deleteCabinApi } from '../../services/apiBookings';

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Booking deleted successfully!');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
};

import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export const useBookings = () => {
  const [searachParams] = useSearchParams();

  // FILTER
  const filterValue = searachParams.get('status');
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings', filter],
    queryFn: () => getBookings({ filter }),
  });

  return {
    bookings,
    isLoading,
    error,
  };
};

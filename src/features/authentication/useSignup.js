import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: user => {
      toast.success(
        'Account created successfully!, Please verify the new account from the users email address'
      );
    },
    onError: err => toast.error(err.message),
  });

  return { isLoading, signup };
};

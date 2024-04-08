import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import isAuth from '@/lib/services/auth';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const authenticate = isAuth();

    if (!authenticate) {
      router.push('/');
    }
  }, []);

  return;
};

export default useAuth;

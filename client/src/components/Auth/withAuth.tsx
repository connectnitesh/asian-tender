import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType, FC } from 'react';

const withAuth = <P extends object>(Component: ComponentType<P>): FC<P> => {
  const Auth: FC<P> = (props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    return user ? <Component {...props} /> : null;
  };

  return Auth;
};

export default withAuth;

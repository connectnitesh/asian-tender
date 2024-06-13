import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = <P extends Record<string, unknown>>(Component: React.ComponentType<P>): React.FC<P> =>{
  const Auth: React.FC<P> = (props) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user, router]);

    return user ? <Component {...props} /> :  null;

  };

  return Auth;
};

export default withAuth;

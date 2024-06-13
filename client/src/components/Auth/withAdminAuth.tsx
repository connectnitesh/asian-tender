import {  useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/authadminContext';

const withAdminAuth = <P extends Record<string, unknown>>(Component: React.ComponentType<P>): React.FC<P> =>{
  const adminAuth: React.FC<P> = (props) => {
    const { admin } = useAdminAuth() as { admin: any };
    const router = useRouter();

    useEffect(() => {
      if (!admin) {
        router.push('/admin_panel');
      }
    }, [admin, router]);

    return admin ? <Component {...props} /> :  null;
  };

  return adminAuth
};

export default withAdminAuth;

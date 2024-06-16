"use client"



import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/authadminContext';
import { useEffect, ComponentType, FC } from 'react';

const withAdminAuth = <P extends Record<string, unknown>>(Component: ComponentType<P>): FC<P> => {
  const AdminAuth: FC<P> = (props) => {
    const { admin } = useAdminAuth();
    const router = useRouter();

    useEffect(() => {
      if (!admin) {
        router.push('/admin_panel');
      }
    }, [admin, router]);

    return admin ? <Component {...props as P} /> : null;
  };

  return AdminAuth;
};

export default withAdminAuth;

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/context/authadminContext';

const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const { admin } = useAdminAuth() as { admin: any};
    const router = useRouter();

    useEffect(() => {
      if (!admin) {
        router.push('/admin_panel');
      }
    }, [admin, router]);

    if (!admin) {
      return null; 
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;

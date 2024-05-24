import { redirect } from "next/navigation";
import { useEffect } from 'react';

export function withAuth<P>(Component: React.FC<React.PropsWithChildren<P>>): React.FC<React.PropsWithChildren<P>> {
    return function ProtectedRoute(props: React.PropsWithChildren<P>) {

        useEffect(() => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                redirect('/login');
            }
        }, []);

        return <Component {...props} />;
    };
}

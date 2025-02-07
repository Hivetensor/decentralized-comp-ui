// components/ProtectedRoute.tsx
'use client';

import {useAuth} from '@/contexts/AuthContext';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiresHost?: boolean;
}

export function ProtectedRoute({children, requiresHost = false}: ProtectedRouteProps) {
    const {user, isLoading} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
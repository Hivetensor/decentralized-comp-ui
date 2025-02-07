// components/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiresHost?: boolean;
    requiresCompetitor?: boolean;
}

export function ProtectedRoute({
                                   children,
                                   requiresHost = false,
                                   requiresCompetitor = false
                               }: ProtectedRouteProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push('/');
                return;
            }

            if (requiresHost && user.type !== 'host') {
                router.push('/');
                return;
            }

            if (requiresCompetitor && user.type !== 'competitor') {
                router.push('/');
                return;
            }
        }
    }, [user, isLoading, router, requiresHost, requiresCompetitor]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500" />
        </div>;
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
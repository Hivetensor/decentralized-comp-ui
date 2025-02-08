'use client';

import { useAuth } from '@/contexts/AuthContext';

export function AppWrapper({children}: {children: React.ReactNode}) {
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"/>
            </div>
        );
    }

    return <>{children}</>;
}
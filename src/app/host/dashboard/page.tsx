import HostDashboard from '@/components/HostDashboard';
import {ProtectedRoute} from "@/components/ProtectedRoute";

export default function HostDashboardPage() {
    return(
        <ProtectedRoute requiresHost>
        <HostDashboard/>
        </ProtectedRoute>
);
}
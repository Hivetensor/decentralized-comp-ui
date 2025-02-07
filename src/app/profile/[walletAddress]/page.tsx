import UserProfilePage from '@/components/UserProfilePage';
import {ProtectedRoute} from "@/components/ProtectedRoute";

export default function ProfilePage() {
    return (
        <ProtectedRoute requiresCompetitor>
            <UserProfilePage/>
        </ProtectedRoute>
    )
}
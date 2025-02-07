import {ProtectedRoute} from "@/components/ProtectedRoute";
import UserProfile from "@/components/UserProfile";

export default function ProfilePage() {
    return (
        <ProtectedRoute requiresCompetitor>
            <UserProfile/>
        </ProtectedRoute>
    )
}
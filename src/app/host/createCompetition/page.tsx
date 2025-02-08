import CreateCompetitionForm from '@/components/CreateCompetitionForm';
import {ProtectedRoute} from "@/components/ProtectedRoute";

export default function CreateCompetitionPage() {
    return (
        <ProtectedRoute requiresHost>
            <CreateCompetitionForm/>;
        </ProtectedRoute>
    );
}
import DocumentTitle from "./DocumentTitle";
import ProtectedRoute from "./ProtectedRoute";

function Page({ name, allowedRoles, children }) {
    return (
        <ProtectedRoute allowedRoles={allowedRoles}>
            <DocumentTitle title={name} />
            {children}
        </ProtectedRoute>
    );
}

export default Page;
import DocumentTitle from "./DocumentTitle";
import ProtectedRoute from "./ProtectedRoute";

function Page({ name, allowedRoles, children, path }) {
    return (
        <ProtectedRoute allowedRoles={allowedRoles} path={path}>
            <DocumentTitle title={name} />
            {children}
        </ProtectedRoute>
    );
}

export default Page;
import { Link } from "react-router-dom";
import routes from "../config/routes";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link
          to={routes.home}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

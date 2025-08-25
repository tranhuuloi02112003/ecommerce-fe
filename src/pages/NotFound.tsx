import { Link } from "react-router-dom";
import routes from "../config/routes";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-red-500">404 NOT FOUND</h1>
        <div className="mt-4">
          <Link to={routes.home} className="text-blue-500 underline">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

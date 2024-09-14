import { ROUTES } from "constants/index";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="dark:bg-gray-800 flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white">404 - Page Not Found</h1>
      <p className="mt-2 text-gray-600 darl:text-white">
        The page you are looking for does not exist.
      </p>
      <Link
        to={ROUTES.posts.index}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFound;

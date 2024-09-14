import { Suspense } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import DetailCard from "./Card";
import Skeleton from "../Card/Skeleton";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon

const PostDetail = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer flex items-center text-blue-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-gray-500 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Posts
      </button>

      <Suspense
        fallback={
          <div className="p-10">
            <Skeleton />
          </div>
        }
      >
        <DetailCard />
      </Suspense>
    </div>
  );
};

export default PostDetail;

const UserInfoCard = () => {
  return (
    <div className="bg-white border h-80 w-full border-gray-200 shadow-lg rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-800 p-6 flex">
      <img
        src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=100"
        alt="User"
        className="rounded-full w-16 h-16 object-cover border-2 border-blue-500 dark:border-blue-300"
      />
      <div className="ml-4">
        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
          Mohit Harshan
        </h4>
        <p className="text-gray-500 dark:text-neutral-400">Good Morning!</p>
      </div>
    </div>
  );
};

export default UserInfoCard;

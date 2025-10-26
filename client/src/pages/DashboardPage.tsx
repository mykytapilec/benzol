import { useAuthStore } from "../store/useAuthStore";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-2">
        Welcome, {user?.email || "Guest"}!
      </h1>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;

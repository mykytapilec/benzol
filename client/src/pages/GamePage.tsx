import { useAuthStore } from '../store/useAuthStore'

export default function GamePage() {
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Benzol Hex Game</h1>
      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  )
}

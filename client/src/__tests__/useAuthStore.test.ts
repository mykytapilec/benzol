import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../store/useAuthStore";

describe("useAuthStore", () => {
  beforeEach(() => {
    const { logout } = useAuthStore.getState();
    logout(); // очистить перед каждым тестом
  });

  it("sets and retrieves token", () => {
    const { setToken } = useAuthStore.getState();
    setToken("abc123");
    expect(useAuthStore.getState().token).toBe("abc123");
  });

  it("sets and retrieves user", () => {
    const { setUser } = useAuthStore.getState();
    const mockUser = { id: 1, email: "test@example.com" };
    setUser(mockUser);
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it("logout clears user and token", () => {
    const { setUser, setToken, logout } = useAuthStore.getState();
    setUser({ id: 1, email: "a@b.com" });
    setToken("123");
    logout();
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().token).toBeNull();
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../store/useAuthStore";
import type { User } from "../types/auth";

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null });
  });

  it("sets and retrieves token", () => {
    const mockUser: User = { id: 1, email: "test@example.com" };
    useAuthStore.getState().setAuth(mockUser, "abc123");
    expect(useAuthStore.getState().token).toBe("abc123");
  });

  it("sets and retrieves user", () => {
    const mockUser: User = { id: 1, email: "test@example.com" };
    useAuthStore.getState().setAuth(mockUser, "abc123");
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it("logout clears user and token", () => {
    const mockUser: User = { id: 1, email: "test@example.com" };
    useAuthStore.getState().setAuth(mockUser, "abc123");
    useAuthStore.getState().logout();
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().token).toBeNull();
  });
});

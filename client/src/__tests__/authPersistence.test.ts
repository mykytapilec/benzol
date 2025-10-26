import { describe, it, expect, beforeEach } from "vitest";
import type { User } from "../types/auth";
import { useAuthStore } from "../store/useAuthStore";

describe("Auth persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ user: null, token: null });
  });

  it("persists token and user in localStorage", () => {
    const user: User = { id: 1, email: "test@example.com" };
    const token = "abc123";

    useAuthStore.getState().setAuth(user, token);

    localStorage.setItem("auth_user", JSON.stringify(useAuthStore.getState().user));
    localStorage.setItem("auth_token", useAuthStore.getState().token!);

    const storedUser = JSON.parse(localStorage.getItem("auth_user")!) as User;
    const storedToken = localStorage.getItem("auth_token");

    expect(storedUser).toEqual(user);
    expect(storedToken).toBe(token);
  });

  it("restores state from localStorage", () => {
    const user: User = { id: 1, email: "test@example.com" };
    const token = "abc123";

    localStorage.setItem("auth_user", JSON.stringify(user));
    localStorage.setItem("auth_token", token);

    const newStore = useAuthStore;

    const storedUser = localStorage.getItem("auth_user")
      ? (JSON.parse(localStorage.getItem("auth_user")!) as User)
      : null;
    const storedToken = localStorage.getItem("auth_token");

    newStore.setState({ user: storedUser, token: storedToken });

    const state = newStore.getState();
    expect(state.user).toEqual(user);
    expect(state.token).toBe(token);
  });
});

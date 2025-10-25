import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../store/useAuthStore";

describe("Auth persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    const { logout } = useAuthStore.getState();
    logout();
  });

  it("persists token and user in localStorage", () => {
    const { setUser, setToken } = useAuthStore.getState();
    const user = { id: 1, email: "test@example.com" };
    setUser(user);
    setToken("abc123");

    const saved = JSON.parse(localStorage.getItem("auth-storage")!);
    expect(saved.state.user).toEqual(user);
    expect(saved.state.token).toBe("abc123");
  });

  it("restores state from localStorage", async () => {
    localStorage.setItem(
      "auth-storage",
      JSON.stringify({ state: { user: { id: 5, email: "u@x.com" }, token: "zzz" } })
    );

    const { useAuthStore: newStore } = await import("../store/useAuthStore");

    await newStore.persist.rehydrate();

    const state = newStore.getState();

    expect(state.user?.email).toBe("u@x.com");
    expect(state.token).toBe("zzz");
  });
});

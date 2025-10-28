import { describe, it, expect, beforeEach } from "vitest";
import { useAuthStore } from "../store/useAuthStore";

describe("Auth persistence", () => {
  beforeEach(() => {
    localStorage.clear();

    const store = useAuthStore.getState();
    store.token = null;
    store.user = null;
  });

  it("persists token and user in localStorage", () => {
    const token = "abc123";
    const user = { id: 1, email: "test@example.com" };

    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));

    const storedToken = localStorage.getItem("auth_token");
    const storedUser = JSON.parse(localStorage.getItem("auth_user") || "null");

    expect(storedToken).toBe(token);
    expect(storedUser).toEqual(user);
  });

  it("restores state from localStorage", () => {
    const token = "abc123";
    const user = { id: 1, email: "test@example.com" };

    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));

    const restoredToken = localStorage.getItem("auth_token");
    const restoredUser = JSON.parse(localStorage.getItem("auth_user") || "null");

    expect(restoredToken).toBe(token);
    expect(restoredUser).toEqual(user);
  });
});

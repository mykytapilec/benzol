import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuthStore } from "../store/useAuthStore";
import { AuthService } from "../services/authService";

vi.mock("../services/authService");

const mockUser = { id: 1, email: "test@example.com" };
const mockToken = "mock-token";

describe("useAuthStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it("logs in user and updates store", async () => {
    (AuthService.login as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      user: mockUser,
      token: mockToken,
    });

    await useAuthStore.getState().login("test@example.com", "password");
    const state = useAuthStore.getState();

    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(mockToken);
    expect(state.isAuthenticated).toBe(true);
  });

  it("registers user and updates store", async () => {
    (AuthService.register as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      user: mockUser,
      token: mockToken,
    });

    await useAuthStore.getState().register("test@example.com", "password");
    const state = useAuthStore.getState();

    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(mockToken);
    expect(state.isAuthenticated).toBe(true);
  });

  it("logs out user", () => {
    useAuthStore.setState({
      user: mockUser,
      token: mockToken,
      isAuthenticated: true,
    });

    useAuthStore.getState().logout();
    const state = useAuthStore.getState();

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});

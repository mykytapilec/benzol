import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { AuthService } from "../services/authService";
import { api } from "../services/api";

const mockUser = { id: 1, email: "test@example.com" };
const mockToken = "mock-token";

vi.mock("../services/api", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("AuthService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should register a new user", async () => {
    (api.post as unknown as Mock).mockResolvedValue({
      data: { user: mockUser, access_token: mockToken },
    });

    const result = await AuthService.register("test@example.com", "123456");

    expect(result).toEqual({ user: mockUser, token: mockToken });
    expect(api.post).toHaveBeenCalledWith("/auth/signup", {
      email: "test@example.com",
      password: "123456",
    });
  });

  it("should login an existing user", async () => {
    (api.post as unknown as Mock).mockResolvedValue({
      data: { access_token: mockToken },
    });

    (api.get as unknown as Mock).mockResolvedValue({
      data: mockUser,
    });

    const result = await AuthService.login("test@example.com", "123456");

    expect(result).toEqual({ user: mockUser, token: mockToken });

    expect(api.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@example.com",
      password: "123456",
    });
    expect(api.get).toHaveBeenCalledWith("/auth/me", {
      headers: { Authorization: `Bearer ${mockToken}` },
    });
  });
});

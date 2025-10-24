import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { api } from "../lib/api";

vi.mock("../lib/api", () => ({
  api: { post: vi.fn() },
}));

describe("Auth pages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders register form and submits data", async () => {
    const mockedPost = api.post as Mock;
    mockedPost.mockResolvedValue({ data: { id: 1 } });

    render(
      <MemoryRouter initialEntries={["/register"]}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");
    await user.type(screen.getByPlaceholderText("Confirm password"), "password123");
    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(mockedPost).toHaveBeenCalledWith("/auth/register", {
      email: "test@example.com",
      password: "password123",
    });
  });

  it("renders login form and submits data", async () => {
    const mockedPost = api.post as Mock;
    mockedPost.mockResolvedValue({ data: { access_token: "mockToken" } });

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MemoryRouter>
    );

    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Email"), "test@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(mockedPost).toHaveBeenCalledWith("/auth/login", {
      email: "test@example.com",
      password: "password123",
    });
  });
});

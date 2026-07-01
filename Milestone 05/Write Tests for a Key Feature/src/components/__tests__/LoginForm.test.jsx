import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../../features/LoginForm.jsx";
import { loginUser } from "../../api/auth";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../api/auth", () => ({
  loginUser: jest.fn(),
}));

// Mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  jest.clearAllMocks();
});


const renderLogin = () =>
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

describe("LoginForm", () => {
  describe("happy path", () => {
    test("renders email, password and submit button", () => {
      renderLogin();

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /sign in/i })
      ).toBeInTheDocument();
    });

    test("calls login API with entered credentials", async () => {
      loginUser.mockResolvedValue({
        user: {
          email: "john@test.com",
        },
      });

      const user = userEvent.setup();

      renderLogin();

      await user.type(
        screen.getByLabelText(/email/i),
        "john@test.com"
      );

      await user.type(
        screen.getByLabelText(/password/i),
        "123456"
      );

      await user.click(
        screen.getByRole("button", {
          name: /sign in/i,
        })
      );

      await waitFor(() => {
        expect(loginUser).toHaveBeenCalledWith({
          email: "john@test.com",
          password: "123456",
        });
      });
    });
  });

  describe("failure cases", () => {
    test("shows server error when API rejects", async () => {
      loginUser.mockRejectedValue(
        new Error("Invalid credentials")
      );

      const user = userEvent.setup();

      renderLogin();

      await user.type(
        screen.getByLabelText(/email/i),
        "wrong@test.com"
      );

      await user.type(
        screen.getByLabelText(/password/i),
        "wrongpass"
      );

      await user.click(
        screen.getByRole("button", {
          name: /sign in/i,
        })
      );

      expect(
        await screen.findByText(/invalid credentials/i)
      ).toBeInTheDocument();
    });

    test("button enters loading state while request is running", async () => {
      let resolvePromise;

      loginUser.mockImplementation(
        () =>
          new Promise((resolve) => {
            resolvePromise = resolve;
          })
      );

      const user = userEvent.setup();

      renderLogin();

      await user.type(
        screen.getByLabelText(/email/i),
        "john@test.com"
      );

      await user.type(
        screen.getByLabelText(/password/i),
        "123456"
      );

      await user.click(
        screen.getByRole("button", {
          name: /sign in/i,
        })
      );

      expect(
        screen.getByRole("button")
      ).toBeDisabled();

      resolvePromise({
        user: { email: "john@test.com" },
      });

      await waitFor(() =>
        expect(mockNavigate).toHaveBeenCalled()
      );
    });
  });

  describe("edge cases", () => {
    test("does not call API when fields are empty", async () => {
      const user = userEvent.setup();

      renderLogin();

      await user.click(
        screen.getByRole("button", {
          name: /sign in/i,
        })
      );

      expect(loginUser).not.toHaveBeenCalled();
    });
  });
});
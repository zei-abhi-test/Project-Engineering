import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorMessage from "../components/ErrorMessage";

describe("ErrorMessage", () => {
  describe("happy path", () => {
    test("renders the message", () => {
      render(<ErrorMessage message="Something went wrong" />);

      expect(
        screen.getByText(/something went wrong/i)
      ).toBeInTheDocument();
    });

    test("renders retry button and calls onRetry", async () => {
      const user = userEvent.setup();

      const retry = jest.fn();

      render(
        <ErrorMessage
          message="Network Error"
          onRetry={retry}
        />
      );

      const button = screen.getByRole("button", {
        name: /try again/i,
      });

      await user.click(button);

      expect(retry).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    test("does not render retry button without onRetry", () => {
      render(<ErrorMessage message="Oops!" />);

      expect(
        screen.queryByRole("button", {
          name: /try again/i,
        })
      ).not.toBeInTheDocument();
    });
  });
});
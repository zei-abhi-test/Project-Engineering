import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Button", () => {
  describe("happy path", () => {
    test("renders label text", () => {
      render(<Button label="Submit" />);

      expect(
        screen.getByRole("button", { name: /submit/i })
      ).toBeInTheDocument();
    });

    test("calls onClick exactly once", async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <Button
          label="Click Me"
          onClick={handleClick}
        />
      );

      await user.click(
        screen.getByRole("button", {
          name: /click me/i,
        })
      );

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    test("disabled button does not call onClick", async () => {
      const user = userEvent.setup();

      const handleClick = jest.fn();

      render(
        <Button
          label="Disabled"
          disabled={true}
          onClick={handleClick}
        />
      );

      const button = screen.getByRole("button", {
        name: /disabled/i,
      });

      expect(button).toBeDisabled();

      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
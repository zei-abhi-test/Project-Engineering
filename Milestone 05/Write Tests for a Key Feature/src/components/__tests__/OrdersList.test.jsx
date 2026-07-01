import { render, screen } from "@testing-library/react";
import OrdersList from "../../features/OrdersList";
import { useOrders } from "../../hooks/useOrders";

jest.mock("../../hooks/useOrders");

describe("OrdersList", () => {
  describe("happy path", () => {
    test("renders all orders returned from the hook", () => {
      useOrders.mockReturnValue({
        orders: [
          {
            id: 1,
            name: "Laptop",
            date: "2025-01-01",
            status: "Delivered",
          },
          {
            id: 2,
            name: "Keyboard",
            date: "2025-01-02",
            status: "Processing",
          },
        ],
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      });

      render(<OrdersList />);

      expect(screen.getByText("Laptop")).toBeInTheDocument();
      expect(screen.getByText("Keyboard")).toBeInTheDocument();
    });
  });

  describe("empty state", () => {
    test("shows empty state when there are no orders", () => {
      useOrders.mockReturnValue({
        orders: [],
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      });

      render(<OrdersList />);

      expect(
        screen.getByText(/no orders yet/i)
      ).toBeInTheDocument();
    });
  });

  describe("failure cases", () => {
    test("shows error message when hook returns an error", () => {
      useOrders.mockReturnValue({
        orders: [],
        isLoading: false,
        error: "Network Error",
        refetch: jest.fn(),
      });

      render(<OrdersList />);

      expect(
        screen.getByText(/something went wrong loading your orders/i)
      ).toBeInTheDocument();
    });
  });
});
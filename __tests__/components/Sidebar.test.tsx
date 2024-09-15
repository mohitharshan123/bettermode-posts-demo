import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { JWT_TOKEN_COOKIE_NAME, ROUTES } from "constants/index";
import Sidebar from "components/Sidebar";

const navigateMock = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => navigateMock,
}));

const removeMock = jest.fn();

jest.mock("universal-cookie", () => {
  return jest.fn().mockImplementation(() => ({
    remove: removeMock,
  }));
});

describe("Sidebar Component", () => {
  beforeEach(() => {
    removeMock.mockClear();
    navigateMock.mockClear();
  });

  test("renders Sidebar component and Logout button", () => {
    render(<Sidebar />);

    const logoutButton = screen.getByText("Logout", { selector: "button" });
    expect(logoutButton).toBeInTheDocument();
  });

  test("renders Sidebar component and Posts link", () => {
    render(<Sidebar />);

    const postsLink = screen.getByText("Posts", { selector: "a" });
    expect(postsLink).toBeInTheDocument();
  });

  it('should navigate to posts when clicking "Posts"', async () => {
    render(<Sidebar />);

    const postsLink = screen.getByText("Posts", { selector: "a" });
    fireEvent.click(postsLink);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(ROUTES.posts.index);
    });
  });

  it("should handle logout", async () => {
    render(<Sidebar />);

    const logoutButton = screen.getByText("Logout", { selector: "button" });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(removeMock).toHaveBeenCalledWith(JWT_TOKEN_COOKIE_NAME, {
        path: "/",
      });
    });
  });

  test("should toggle sidebar visibility on mobile", async () => {
    render(<Sidebar />);

    const sidebar = screen.getByRole("dialog");
    expect(sidebar).toHaveClass("-translate-x-full");

    const toggleButton = screen.getByLabelText("Open sidebar");
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(sidebar).toHaveClass("translate-x-0");
    });

    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(sidebar).toHaveClass("-translate-x-full");
    });
  });
});

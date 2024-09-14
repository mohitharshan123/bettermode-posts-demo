import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useNavigate } from "react-router-dom";
import { JWT_TOKEN_COOKIE_NAME, ROUTES } from "constants/index";
import Sidebar from "components/Sidebar.tsx";
import Cookies from "universal-cookie";

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

const navigate = useNavigate();

describe("Sidebar Component", () => {
  let cookies: jest.Mocked<Cookies>;

  beforeEach(() => {
    cookies = new Cookies() as jest.Mocked<Cookies>;
    cookies.remove.mockClear();
  });

  test("renders Sidebar component and Logout link", () => {
    render(<Sidebar />);

    const logoutLink = screen.getByText("Logout", { selector: "li" });
    expect(logoutLink).toBeInTheDocument();
  });

  test("renders Sidebar component and Logout button", () => {
    render(<Sidebar />);

    const logoutButton = screen.getByText("Logout", { selector: "button" });
    expect(logoutButton).toBeInTheDocument();
  });

  it('should navigate to posts when clicking "Posts"', async () => {
    render(<Sidebar />);

    const postsLink = await screen.findByText("Posts", { selector: "li" });
    fireEvent.click(postsLink);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(ROUTES.posts.index);
    });
  });

  it("should handle logout", async () => {
    render(<Sidebar />);

    const logoutButton = screen.getByText("Logout", { selector: "button" });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(removeMock).toHaveBeenCalledWith(JWT_TOKEN_COOKIE_NAME);
    });
  });
});

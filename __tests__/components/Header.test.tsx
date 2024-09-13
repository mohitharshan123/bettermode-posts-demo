import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "components/Header";

const mockUser = {
  profilePicture: {
    url: "https://example.com/avatar.png",
  },
};

describe("Header Component", () => {
  test("renders Header component with user profile picture and notification button", () => {
    render(<Header user={mockUser as Member} />);

    // Check if the notification icon is present
    const notificationButton = screen.getByTestId("notifications-button");
    expect(notificationButton).toBeInTheDocument();
  });

  test("renders user avatar correctly", () => {
    render(<Header user={mockUser as Member} />);

    // Check if the user profile picture is present and has the correct URL
    const avatar = screen.getByAltText("Avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute("src", mockUser.profilePicture.url);
  });
});

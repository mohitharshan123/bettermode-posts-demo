import "@testing-library/jest-dom";

import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRequestTokenCode } from "graphql/user/useAuthentication";
import { useNavigate } from "react-router-dom";
import Login from "containers/Authentication";

jest.mock("graphql/user/useAuthentication", () => ({
  useRequestTokenCode: jest.fn(),
}));
jest.mock("universal-cookie", () => {
  return jest.fn().mockImplementation(() => ({
    set: jest.fn(),
  }));
});
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  let requestTokenCodeMock: jest.Mock;
  let navigateMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    requestTokenCodeMock = jest.fn();
    navigateMock = jest.fn();

    (useRequestTokenCode as jest.Mock).mockReturnValue([
      requestTokenCodeMock,
      { error: null },
    ]);

    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  test("renders the Login form", () => {
    render(<Login />);

    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Google/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();
  });

  test("displays validation errors", async () => {
    render(<Login />);

    await act(async () => {
      userEvent.click(screen.getByRole("button", { name: /Sign in/i }));
    });
    expect(
      await screen.findByText(/This field is required/i)
    ).toBeInTheDocument();

    await act(() => {
      userEvent.type(screen.getByLabelText(/Email address/i), "invalid-email");
      userEvent.click(screen.getByRole("button", { name: /Sign in/i }));
    });
    expect(await screen.findByText(/Invalid email/i)).toBeInTheDocument();
  });
});

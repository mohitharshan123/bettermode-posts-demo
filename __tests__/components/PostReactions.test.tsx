import "@testing-library/jest-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useFetchAuthUser } from "graphql/user/useAuthUser";
import { ReactionType } from "types/posts";
import useReactions from "components/PostReactions/useReactions";
import PostReactions from "components/PostReactions/index";

jest.mock("graphql/user/useAuthUser", () => ({
  useFetchAuthUser: jest.fn(),
}));

jest.mock("components/PostReactions/useReactions", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@charkour/react-reactions", () => ({
  ReactionBarSelector: jest.fn(() => <div>ReactionBarSelector</div>),
  ReactionCounter: jest.fn(() => <div>ReactionCounter</div>),
}));

const mockMember = {
  __typename: "Member",
  displayName: "John Doe",
  id: "member-id",
  name: "John Doe",
  username: "john_doe",
  email: "john.doe@example.com",
};

const mockPost: any = {
  id: "post-id",
  reactions: [
    {
      count: 1,
      reaction: ReactionType.Like,
      reacted: false,
      participants: { nodes: [{ participant: mockMember }] },
    },
  ],
  postTypeId: "LM0AXrsLZMwXhRJ",
};

const mockUser = {
  authMember: { name: "John Doe" },
};

describe("PostReactions Component", () => {
  beforeEach(() => {
    (useFetchAuthUser as jest.Mock).mockReturnValue({ data: mockUser });
    (useReactions as jest.Mock).mockReturnValue({
      handleReaction: jest.fn(),
      reactionEmoji: "👍",
      isPopupOpen: false,
      setIsPopupOpen: jest.fn(),
      isUpvoteType: false,
    });
  });

  test("renders PostReactions component", () => {
    render(<PostReactions post={mockPost} />);

    const likeButton = screen.getByText("Like");
    expect(likeButton).toBeInTheDocument();
  });

  test("toggles reaction popup", async () => {
    const mockSetIsPopupOpen = jest.fn();
    (useReactions as jest.Mock).mockReturnValue({
      handleReaction: jest.fn(),
      reactionEmoji: "👍",
      isPopupOpen: true, // Simulate the popup being open
      setIsPopupOpen: mockSetIsPopupOpen,
      isUpvoteType: false,
    });

    render(<PostReactions post={mockPost} />);

    const likeButton = screen.getByText("Like");
    fireEvent.click(likeButton);

    await waitFor(() => {
      const reactionBarSelector = screen.getByText("ReactionBarSelector");
      expect(reactionBarSelector).toBeInTheDocument();
    });
  });

  test("shows ReactionCounter", () => {
    render(<PostReactions post={mockPost} />);

    const reactionCounter = screen.getByText("ReactionCounter");
    expect(reactionCounter).toBeInTheDocument();
  });
});

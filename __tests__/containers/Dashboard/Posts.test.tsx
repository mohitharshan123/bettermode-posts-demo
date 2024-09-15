import "@testing-library/jest-dom";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostsList from "containers/Dashboard/Posts/List";
import { useFetchPosts } from "graphql/posts/usePosts";
import { BrowserRouter } from "react-router-dom";

let MockObserverInstance: ResizeObserver;

jest.mock("graphql/posts/usePosts", () => ({
  useFetchPosts: jest.fn(),
}));

jest.mock("@apollo/client/index.js", () => ({
  useSuspenseQuery: jest.fn(),
  gql: jest.fn(),
}));

describe("PostsList Component", () => {
  let fetchMoreMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    fetchMoreMock = jest.fn();

    MockObserverInstance = {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
    global.ResizeObserver = jest
      .fn()
      .mockImplementation(() => MockObserverInstance);

    (useFetchPosts as jest.Mock).mockReturnValue({
      data: {
        posts: {
          nodes: [
            { id: "1", title: "Post 1", owner: { member: { name: "Mohit" } } },
            { id: "2", title: "Post 2", owner: { member: { name: "Mohit" } } },
          ],
          pageInfo: {
            hasNextPage: true,
          },
        },
      },
      fetchMore: fetchMoreMock,
    });
  });

  test("renders posts and load more button", async () => {
    render(
      <BrowserRouter>
        <PostsList />
      </BrowserRouter>
    );

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();

    const loadMoreButton = screen.getByRole("button", { name: /Show More/i });
    expect(loadMoreButton).toBeInTheDocument();
  });

  test("loads more posts on button click", async () => {
    render(
      <BrowserRouter>
        <PostsList />
      </BrowserRouter>
    );
    const loadMoreButton = screen.getByRole("button", { name: /Show More/i });
    userEvent.click(loadMoreButton);

    await waitFor(() => {
      expect(fetchMoreMock).toHaveBeenCalledWith({
        variables: {
          limit: 10,
          offset: 2,
        },
      });
    });
  });

  test("does not show load more button when no next page", () => {
    (useFetchPosts as jest.Mock).mockReturnValue({
      data: {
        posts: {
          nodes: [{ id: "1", title: "Post 1" }],
          pageInfo: {
            hasNextPage: false,
          },
        },
      },
      fetchMore: fetchMoreMock,
    });

    render(
      <BrowserRouter>
        <PostsList />
      </BrowserRouter>
    );
    expect(screen.queryByRole("button", { name: /Show More/i })).toBeNull();
  });
});

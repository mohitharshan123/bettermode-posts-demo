import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useGetPost } from "graphql/posts/usePosts";
import DetailCard from "containers/Dashboard/Posts/Detail/Card";

jest.mock("graphql/posts/usePosts", () => ({
  useGetPost: jest.fn(),
  useReaction: jest.fn().mockImplementation(() => [jest.fn()]),
  useRemoveReaction: jest.fn().mockImplementation(() => [jest.fn()]),
}));

jest.mock("graphql/user/useAuthUser", () => ({
  useFetchAuthUser: jest.fn().mockImplementation(() => ({
    data: {
      name: "Mohit",
    },
  })),
}));

jest.mock("components/PostReactions/utils", () => ({
  getAllowedReactions: jest.fn(),
}));

jest.mock("@apollo/client/index.js", () => ({
  useSuspenseQuery: jest.fn(),
  gql: jest.fn(),
}));

describe("DetailCard", () => {
  beforeEach(() => {
    (useGetPost as jest.Mock).mockImplementation(() => ({
      data: {
        post: {
          space: {
            name: "Space Name",
            image: { url: "http://example.com/image.jpg" },
          },
          fields: [
            { key: "title", value: "<h1>Post Title</h1>" },
            { key: "content", value: "<p>Post content here</p>" },
          ],
          tags: [{ title: "Tag1" }, { title: "Tag2" }],
        },
      },
    }));
  });

  test("renders post details correctly", () => {
    render(
      <MemoryRouter initialEntries={["/posts/123"]}>
        <Routes>
          <Route path="/posts/:postId" element={<DetailCard />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByAltText("Post Image")).toHaveAttribute(
      "src",
      "http://example.com/image.jpg"
    );

    expect(screen.getByText("Space Name")).toBeInTheDocument();

    expect(screen.getByText(/Post Title/)).toBeInTheDocument();
    expect(screen.getByText(/Post content here/)).toBeInTheDocument();

    expect(screen.getByText("Tag1")).toBeInTheDocument();
    expect(screen.getByText("Tag2")).toBeInTheDocument();
  });
});

import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { Post } from "types/posts";
import PostReactions from "components/PostReactions";
import { getAllowedReactions } from "components/PostReactions/utils";
import ErrorBoundary from "components/ErrorBoundary";
import { cleanHtmlContent } from "../utils";
import useOverflow from "hooks/useOverflow";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, contentRef] = useOverflow();
  const navigate = useNavigate();

  const content = post.fields?.find((field) => field.key === "content");

  const cleanedHtmlContent = cleanHtmlContent(content?.value ?? "");

  return (
    <ErrorBoundary>
      <div className="relative flex flex-col bg-white border border-gray-200 shadow-lg rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-800 p-6">
        <div className="flex items-center mb-4">
          {post?.owner?.member?.profilePicture?.url && (
            <img
              src={post?.owner?.member?.profilePicture?.url}
              alt="Job Poster"
              className="rounded-full w-16 h-16 object-cover border-2 border-blue-500 dark:border-blue-300"
            />
          )}
          <div className="ml-4">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
              {post.owner?.member?.name}
            </h4>
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                {moment(post?.createdAt).fromNow()}
              </p>
              <p className="text-xs text-gray-500 dark:text-neutral-400">
                Posted in {post.space?.name}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <button
            onClick={() => navigate(post.id)}
            className="cursor-pointer text-xl font-semibold text-gray-800 dark:text-white mb-2 bg-transparent border-none p-0 text-left"
            aria-label={`Navigate to post ${post.title}`}
          >
            {post.title}
          </button>
          <div
            ref={contentRef}
            className={clsx(
              "text-gray-600 dark:text-white whitespace-pre-line transition-all duration-500 ease-in-out",
              isExpanded ? "max-h-[10000px]" : "max-h-[100px]",
              "overflow-hidden relative"
            )}
          >
            {cleanedHtmlContent !== "null" && (
              <div
                dangerouslySetInnerHTML={{
                  __html: cleanedHtmlContent,
                }}
              ></div>
            )}

            {!isExpanded && isOverflowing && (
              <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white dark:from-neutral-900 to-transparent"></div>
            )}
          </div>
          {(isOverflowing || isExpanded) && (
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-blue-500 dark:text-blue-300 mt-2 hover:underline text-left"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </div>
        {getAllowedReactions(post)?.length > 0 && (
          <div className="mt-2">
            <PostReactions {...{ post }} />
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default PostCard;

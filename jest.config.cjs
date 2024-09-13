module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "components/(.*)": "<rootDir>/src/components/$1",
    "graphql/(.*)": "<rootDir>/src/graphql/$1",
    "containers/(.*)": "<rootDir>/src/containers/$1",
    "hooks/(.*)": "<rootDir>/src/hooks/$1",
    "^assets/(.*)$": "<rootDir>/__mocks__/fileMock.ts",
    "constants/(.*)": "<rootDir>/src/constants/$1",
    "types/(.*)": "<rootDir>/src/types/$1",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.ts",
  },
  modulePaths: ["<rootDir>"],
};

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
  transformIgnorePatterns: ["./node_modules/(?!@apollo/client/).+\\.js$"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
    "^.+\\.cjs$": "babel-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  preset: "ts-jest/presets/js-with-ts-esm",
};

export default {
    testEnvironment: 'node',
    verbose: true,
    testTimeout: 70000,
    preset: 'ts-jest',
    forceExit: true,
    detectOpenHandles: true,
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    testMatch: [
        "**/*.spec.ts",
        "**/*.test.ts",
    ]
};
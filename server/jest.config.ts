import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	verbose: true,
	clearMocks: true,
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
};

export default config;

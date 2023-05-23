# Mobile Capacitor Boilerplate

This is a straightfoward [React](https://reactjs.org/) SPA project run off Vite and loaded into mobile apps via [Capacitor](https://capacitorjs.com/). It has testing, linting, and a bunch of other bits of framework built in, plus a few bits of example code and tests to start you off.

## Use with the monorepo boilerplate

These instructions assume you're setting up a project from scratch; if you're integrating this boilerplate into an existing repository, you will need to do a bit more in the way of manual config to make everything sit together.

### Start with the monorepo root

First follow the instructions in the [monorepo-root repository](https://gitlab.com/rocketmakers/boilerplate/monorepo-root).

### Clone this repository into the monorepo

Once you have your monorepo root ready, you should clone this repository into the `mobile` directory in there:

```bash
# Clone the monorepo-root
git clone git@gitlab.com:rocketmakers/boilerplate/monorepo-root.git my-cool-project

# ...follow the instructions in there first...

# Clone into the frontend/web directory
cd my-cool-tier1-project
mkdir frontend
cd frontend
git git@gitlab.com:rocketmakers/boilerplate/mobile-capacitor.git mobile

# Run post-clone.sh to remove unnecessary files
cd frontend/web
./post-clone.sh
```

### Update the root ESLint config

Add the `tsconfig.eslint.json` file to the `project` block in the root `.eslintrc.js` config, e.g.

```javascript
const config = createEslintConfig(
  {
    project: ['_build/tsconfig.json', 'frontend/mobile/tsconfig.eslint.json'],
    ignorePatterns: ['**/node_modules/**/*.*', 'lib/*', '*.js'],
  }
  ...
);
```

### Move Jest (optional)

Jest is configured in this boilerplate, but if the plan is to have multiple frontends and/or a Node backend you will want to hoist Jest up to root as follows:

1. Move the following packages to the top-level `package.json` under `devDependencies`:

- `@types/jest`
- `identity-obj-proxy`
- `jest`
- `jest-config`
- `jest-environment-jsdom`
- `jest-junit`
- `ts-jest`
- `ts-node`

2. Move the `_test/jest` folder to root.

3. Move the `jest.config.ts` file to root and update along these lines:

```javascript
const defaultOptions = {
  // everything from preset down (inclusive)
};

/** @type {import('ts-jest').InitialOptionsTsJest} */
export default {
  projects: [
    {
      displayName: 'mobile', // or other appropriate name
      testMatch: ['<rootDir>/frontend/mobile/**/*.spec.ts'], // Path to the frontend folder
      testEnvironment: 'jsdom',
      testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
      ...defaultOptions,
    },
    {
      // see other boilerplates for other project types
    },
  ],
  reporters: ['default', ['jest-junit', { outputFile: '_test/jest/test-results/jest.xml' }]],
  roots: ['<rootDir>', '<rootDir>/_test/jest'],
};
```

4. Add `jest-junit` to the `coreModules` list in the monorepo `.eslintrc.js` configuration so it can be picked up as a dependency by Storybook and Playwright without ESLint complaining.

### Update the root Makefile

1. Copy the marked variables at the top of this boilerplate's Makefile to the root Makefile and update `FRONT_MOBILE` to point at e.g. `frontend/web`.

2. In the root Makefile's `install` target, add the following to the end:

```bash
DIR_PATH=$(FRONT_MOBILE) make install
```

3. In the root Makefile's `lint` target, add the following to the end:

```bash
(cd $(FRONT_MOBILE) && npx stylelint "**/*.scss")
```

4. In the root Makefile's `lint-fix` target, add the following to the end:

```bash
(cd $(FRONT_MOBILE) && npx stylelint "**/*.scss" --fix)
```

5. From this boilerplate's Makefile, copy across the 'Running' block to the root Makefile (or sub-template if you're using one) under a sensible title (like 'Frontend - web).

6. From this boilerplate's Makefile, copy across the 'Test' block to the root Makefile's Test block (or sub-template if you're using one).

- If you've hoisted Jest, make sure to edit the `jest-tests` and `jest-tests-ci` targets to run Jest from root.

7. If you need to, rename `FRONT_MOBILE` to something more appropriate.

### Update the root CI file

1. Copy the build, test and optionally deploy steps from the boilerplate `.gitlab-ci.yml` to the root `.gitlab-ci.yml`.

2. Update the artifact paths as needed on the test steps.

### Update Mobile package.json and install

At a minimum you will need to remove the following from `package.json`:

- `@rocketmakers/eslint`
- `@rocketmakers/prettier-config`
- `@types/node`
- `commitizen`
- `cz-customizable`
- `husky`
- `standard-version`
- `ts-node`
- `typescript`

Plus the configuration block for commitizen and the `prepare` script entry created by husky.

Return to root and run the script:

```bash
cd ../..
make install
```

### Final tidy up

Add a link to `_docs/frontend-mobile.md` to the monorepo Contributing guide, renaming as needed.

If you're planning to include multiple frontends, consider hoisting Stylelint and/or Playwright to root - Storybook works best on a per-project basis but can also be moved up as long as all frontends use the same webpack or Vite configuration.

Running the following will complete the tidy up (this message will self destruct):

```bash
./post-clone.sh FINALIZE=true
```

# Workflow for a new DocGen version

## Merge changes

Bump version number, release date, and release notes in:

- package.json
- source/user-guide/parameters.json
- source/user-guide/release-notes.txt

Merge your changes into `master` branch by submitting a pull request.

## Publish to NPM

On `master` branch:

- `pnpm bundle`
- `npm login`
- `npm publish`

## Deploy the gh-pages website

- Merge `master` into `gh-pages` branch
- `pnpm build:docs:gh`
- Commit the generated docs
- Push to `gh-pages` branch

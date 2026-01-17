#!/usr/bin/env bash
set -e  # Exit on error

# Build the package
echo "Bundling package..."
pnpm run bundle

# Pack the package and get the filename
TARBALL_NAME=$(npm pack --silent)
echo "Packed as: $TARBALL_NAME"

# Create a temp test directory
TMPDIR=$(mktemp -d)
echo "Using temp dir: $TMPDIR"

# Move into the temp dir
mv "$TARBALL_NAME" "$TMPDIR/"
cd "$TMPDIR"

npm init -y >/dev/null

# Install the packed package
npm install "./$TARBALL_NAME"

# Run CLI commands to verify
if ! npx docgen-tool --version; then
  echo "⚠ CLI execution failed"
  exit 1
fi

if ! npx docgen-tool scaffold -o ./example-input; then
  echo "⚠ CLI execution failed"
  exit 1
fi

mkdir example-output
if ! npx docgen-tool build -i ./example-input -o ./example-output; then
  echo "⚠ CLI execution failed"
  exit 1
fi

# Cleanup
cd -
rm -rf "$TMPDIR" "$TARBALL_NAME"

echo "✔ Local publish test succeeded!"

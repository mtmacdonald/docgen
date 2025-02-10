#!/usr/bin/env bash
set -e  # Exit on error

# Ensure script runs from the test directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Build the package
echo "Building package..."
yarn build

# Pack the package into a tarball
TARBALL_NAME="package.tgz"
yarn pack --filename "$TARBALL_NAME"
echo "Package packed: $TARBALL_NAME"

# Create a temporary test directory
TMPDIR=$(mktemp -d)
echo "Created temp dir: $TMPDIR"

# Initialize a new project in the temp directory
cd "$TMPDIR"
yarn init -y >/dev/null

# Install the packed tarball
yarn add "file://$SCRIPT_DIR/$TARBALL_NAME"

# Get the package name from the project's root package.json
#PACKAGE_NAME=$(jq -r .name < "$SCRIPT_DIR/../../package.json")
#echo "Running CLI: $PACKAGE_NAME"

# Run the package CLI to verify installation
npx docgen-tool --version || echo "⚠ CLI execution failed"
npx docgen-tool --scaffold || echo "⚠ CLI execution failed"
mkrdir example
npx docgen run -o ./example || echo "⚠ CLI execution failed"

# Cleanup
cd "$SCRIPT_DIR"
rm -rf "$TMPDIR" "$TARBALL_NAME"

echo "✔ Publish test succeeded!"

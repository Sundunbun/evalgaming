# I.A Deployment Script
# Usage instructions: 
# 1. Make sure you are on the viteWebsite branch (should work even if not)
# 2. Run ./deploy.sh
# 3. Wait for the script to complete
# 4. Open a pull request from viteWebsite to main
# 5. Merge the pull request
# 6. Run ./deploy.sh
# 7. Wait for the script to complete


#!/bin/bash

# Exit on any error
set -e

echo "Starting deployment process..."

echo "Verifying current branch..."
current_branch=$(git branch --show-current)
if [ "$current_branch" != "viteWebsite" ]; then
    echo "Switching to viteWebsite branch..."
    git checkout viteWebsite
fi

echo "Building the project..."
npm run build

# Verify build completed successfully
if [ ! -d "dist" ]; then
    echo "Error: Build failed - dist directory not found"
    exit 1
fi

echo "Creating temporary directory for build files..."
# Create a temporary directory to store build files
TEMP_DIR=$(mktemp -d)

echo "Copying build files to temporary directory..."
# Copy the build files to the temporary directory
cp -r dist/* "$TEMP_DIR/"

# Switch to gh-pages branch
echo "Switching to gh-pages branch..."
git checkout gh-pages

# Verify we're in the right branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "gh-pages" ]; then
    echo "Error: Failed to switch to gh-pages branch"
    exit 1
fi

echo "Copying files from temporary directory..."
# Remove existing files
rm -rf * || true
# Copy files from temporary directory
cp -r "$TEMP_DIR"/* .

# Clean up temporary directory
echo "Cleaning up temporary directory..."
rm -rf "$TEMP_DIR"

# Verify copy completed successfully
if [ ! -f "index.html" ]; then
    echo "Error: Failed to copy files - index.html not found"
    exit 1
fi

echo "Adding changes to git..."
git add .

echo "Committing changes..."
git commit -m "Update dist folder with new build" || true

echo "Pushing to gh-pages branch..."
git push origin gh-pages

echo "Deployment complete!"

#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="/home/elie/portfolio"
CONTAINER_NAME="portfolio"
IMAGE_NAME="portfolio-site:latest"
PORT_MAP="22222:3000"

cd "$REPO_DIR"

echo "==> Current git status"
git status --short || true

echo
read -r -p "Do you want to create a commit now? (y/N): " DO_COMMIT

if [[ "$DO_COMMIT" =~ ^[Yy]$ ]]; then
  read -r -p "Enter commit message: " COMMIT_MSG

  if [[ -z "${COMMIT_MSG// }" ]]; then
    echo "Commit message cannot be empty. Aborting."
    exit 1
  fi

  echo "==> Staging changes"
  git add .

  echo "==> Creating commit"
  git commit -m "$COMMIT_MSG"
else
  echo "==> Skipping commit"
fi

echo "==> Pushing to origin/main"
git push origin main

echo "==> Building Docker image: $IMAGE_NAME"
docker build -t "$IMAGE_NAME" .

echo "==> Restarting container: $CONTAINER_NAME"
docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
docker run -d --name "$CONTAINER_NAME" -p "$PORT_MAP" "$IMAGE_NAME" >/dev/null

echo "==> Verifying deployment"
curl -I "http://localhost:22222" | head -n 20

echo
echo "Done. Website container redeployed on http://localhost:22222"

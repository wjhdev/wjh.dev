#!/usr/bin/env bash
set -euo pipefail

: "${IMAGE:?IMAGE is required}"
: "${TAGS:=}"
: "${DELETE_TAGS:=}"

normalize_tags() {
  local raw="$1"

  printf "%s\n" "$raw" \
    | tr "," "\n" \
    | sed -e "s/\r$//" -e "s/^[[:space:]]*//" -e "s/[[:space:]]*$//" \
    | awk "NF && !seen[\$0]++"
}

validate_raw_tag() {
  local tag="$1"

  if [[ "$tag" == *":"* || "$tag" == */* ]]; then
    echo "::error::Expected a raw tag name, got '$tag'. Do not include the image name."
    exit 1
  fi

  if [[ ! "$tag" =~ ^[A-Za-z0-9_][A-Za-z0-9_.-]{0,127}$ ]]; then
    echo "::error::Invalid Docker tag '$tag'."
    exit 1
  fi
}

mapfile -t publish_tags < <(normalize_tags "$TAGS")
mapfile -t delete_tags < <(normalize_tags "$DELETE_TAGS")

for tag in "${publish_tags[@]}"; do
  validate_raw_tag "$tag"
done

for tag in "${delete_tags[@]}"; do
  validate_raw_tag "$tag"
done

{
  if [ "${#publish_tags[@]}" -gt 0 ]; then
    echo "publish=true"
  else
    echo "publish=false"
  fi

  if [ "${#delete_tags[@]}" -gt 0 ]; then
    echo "delete=true"
  else
    echo "delete=false"
  fi

  echo "tags<<TAGS"
  for tag in "${publish_tags[@]}"; do
    echo "$IMAGE:$tag"
  done
  echo "TAGS"

  echo "delete_tags<<DELETE_TAGS"
  for tag in "${delete_tags[@]}"; do
    echo "$tag"
  done
  echo "DELETE_TAGS"
} >> "$GITHUB_OUTPUT"

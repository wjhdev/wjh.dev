#!/usr/bin/env bash
set -euo pipefail

theme_source="/opt/wjh.dev/themes/wjh.dev"
theme_target="/var/www/html/wp-content/themes/wjh.dev"
stats_source="/opt/wjh.dev/stencil-stats.json"
stats_target="/srv/stencil-stats.json"

mkdir -p "$(dirname "$theme_target")" "$(dirname "$stats_target")"

rm -rf "$theme_target"
cp -a "$theme_source" "$theme_target"
cp "$stats_source" "$stats_target"
chown -R www-data:www-data "$theme_target" "$stats_target"

if command -v docker-entrypoint.sh >/dev/null 2>&1; then
  exec docker-entrypoint.sh "$@"
fi

exec "$@"

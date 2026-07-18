FROM node:17.5.0 AS stencil
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build the WordPress theme.
COPY . .
RUN npm run build

FROM ghcr.io/broadsheet-technology/wordpress:0.5

COPY --from=stencil --chown=www-data:www-data /app/bin/wp-content/themes/wjh.dev /opt/wjh.dev/themes/wjh.dev
COPY --from=stencil --chown=www-data:www-data /app/bin/stencil-stats.json /opt/wjh.dev/stencil-stats.json
COPY config/wordpress/entrypoint.sh /usr/local/bin/wjhdev-entrypoint

RUN chmod +x /usr/local/bin/wjhdev-entrypoint

ENTRYPOINT ["/usr/local/bin/wjhdev-entrypoint"]

FROM node:17.5.0 AS stencil
WORKDIR /app
COPY . .

# 1/ build the worpdress theme
RUN npm install
RUN npm run build


FROM wordpress:5.9.1-php7.4-fpm

# 1/ install redis
RUN pecl install redis && docker-php-ext-enable redis

# 2/ install cron
RUN apt-get update && apt-get -y install cron

# 3/ install wordpress cronjob
RUN crontab -l | { cat; echo "*/10 * * * * /usr/local/bin/php -q /var/www/html/wp-cron.php >> /tmp/cron.log"; } | crontab -

# 4/ symolically link wordpress theme 
COPY --from=stencil /app/bin/wp-content/themes /app/bin/themes
RUN touch /var/www/html/wp-content/themes; ln -s /app/bin/themes /var/www/html/wp-content/themes

# 5/ dump env vars (for cron process), start cron service & run wordpress's docker-entrypoint
CMD printenv > /etc/environment && service cron start && bash /usr/local/bin/docker-entrypoint.sh php-fpm
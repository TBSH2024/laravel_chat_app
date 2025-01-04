FROM php:8.4.2-apache

RUN apt-get update \
    && apt-get install -y git libzip-dev unzip \
    && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libxml2-dev curl \
    && apt-get install -y libc-dev make autoconf \
    && git config --global --add safe.directory /var/www/html/src/ \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install zip pdo pdo_mysql mysqli opcache

RUN yes '' | pecl install redis

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY apache-virtualhost.conf /etc/apache2/sites-enabled/000-default.conf

COPY server.sh /usr/local/bin/server.sh
RUN chmod +x /usr/local/bin/server.sh

ENTRYPOINT ["/usr/local/bin/server.sh"]
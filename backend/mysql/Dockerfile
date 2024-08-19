# Use the official MySQL image as the base image
FROM mysql:9.0.1

# Copy the initialization script into the container
COPY ./init.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3301

# Set environment variables (optional, can be set in .env)
ENV MYSQL_DATABASE=${DB_DATABASE} \
    MYSQL_ROOT_PASSWORD=y${DB_PASSWORD} \
    MYSQL_PASSWORD=${DB_PASSWORD} \
    MYSQL_USER=${DB_USERNAME}


CMD ["mysqld", "--port=3301"]

# The MySQL image automatically runs any .sql scripts placed in /docker-entrypoint-initdb.d/

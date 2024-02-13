# Use the official PostgreSQL image as the base image
FROM postgres:latest

# Set environment variables for PostgreSQL
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD tar6*down
ENV POSTGRES_DB clockingsystem
ENV TZ=America/New_York

# Copy the SQL dump backup file to the container
COPY ./backup.sql /docker-entrypoint-initdb.d/backup.sql

# Set permissions on the SQL dump file
RUN chmod 755 /docker-entrypoint-initdb.d/backup.sql


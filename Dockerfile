FROM postgres:latest

# Set the password for the 'postgres' user
ENV POSTGRES_PASSWORD=adminadmin

# Set the default database
ENV POSTGRES_DB=db

# Expose the PostgreSQL port
EXPOSE 5432
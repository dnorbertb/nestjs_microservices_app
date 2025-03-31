#!/bin/bash
set -e

echo "Checking PostgreSQL availability..."
# Wait for PostgreSQL to be available (longer wait)
until pg_isready -U "$POSTGRES_USER"; do
  echo "Waiting for PostgreSQL... (retrying in 2 seconds)"
  sleep 2
done
echo "PostgreSQL is available!"

# Create databases if they don't exist
echo "Creating databases if they don't exist..."

# Check if the 'usersService' database exists, create if not
psql -U "$POSTGRES_USER" -tc "SELECT 1 FROM pg_database WHERE datname = 'usersService'" | grep -q 1 || psql -U "$POSTGRES_USER" -c "CREATE DATABASE \"usersService\""
# Check if the 'authService' database exists, create if not
psql -U "$POSTGRES_USER" -tc "SELECT 1 FROM pg_database WHERE datname = 'authService'" | grep -q 1 || psql -U "$POSTGRES_USER" -c "CREATE DATABASE \"authService\""
# Check if the 'notesService' database exists, create if not
psql -U "$POSTGRES_USER" -tc "SELECT 1 FROM pg_database WHERE datname = 'notesService'" | grep -q 1 || psql -U "$POSTGRES_USER" -c "CREATE DATABASE \"notesService\""

echo "Databases have been created or already exist!"

# Creating 'notes_user' and granting permissions
echo "Creating 'notes_user' and granting permissions..."

# Check if the 'notes_user' already exists
psql -U "$POSTGRES_USER" -c "CREATE ROLE notes_user WITH LOGIN PASSWORD 'password';"


# Grant privileges to 'notes_user' on usersService
echo "Granting privileges on usersService..."
psql -U "$POSTGRES_USER" -d "usersService" -c "GRANT ALL PRIVILEGES ON DATABASE \"usersService\" TO notes_user;"
psql -U "$POSTGRES_USER" -d "usersService" -c "GRANT USAGE, CREATE ON SCHEMA public TO notes_user;"
psql -U "$POSTGRES_USER" -d "usersService" -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO notes_user;"

# Grant privileges to 'notes_user' on authService
echo "Granting privileges on authService..."
psql -U "$POSTGRES_USER" -d "authService" -c "GRANT ALL PRIVILEGES ON DATABASE \"authService\" TO notes_user;"
psql -U "$POSTGRES_USER" -d "authService" -c "GRANT USAGE, CREATE ON SCHEMA public TO notes_user;"
psql -U "$POSTGRES_USER" -d "authService" -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO notes_user;"

# Grant privileges to 'notes_user' on notesService
echo "Granting privileges on notesService..."
psql -U "$POSTGRES_USER" -d "notesService" -c "GRANT ALL PRIVILEGES ON DATABASE \"notesService\" TO notes_user;"
psql -U "$POSTGRES_USER" -d "notesService" -c "GRANT USAGE, CREATE ON SCHEMA public TO notes_user;"
psql -U "$POSTGRES_USER" -d "notesService" -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO notes_user;"

echo "Init script finished!"

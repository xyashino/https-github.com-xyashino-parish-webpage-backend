<p style="text-align: center">
  <img src="https://github-readme-tech-stack.vercel.app/api/cards?lineCount=2&theme=angular&line1=typescript,typescript,3178C6;nestjs,nestjs,E0234E;passport,passport,34E27A;" alt="Tech Stack"/>
</p>

# PARISH-WEBPAGE-BACKEND

**PARISH-WEBPAGE -** is a full-stack application that aims to present a simple parish website with the ability to edit certain things like intentions and announcements, in the style of a simple "Wordpress". The project consists of three repositories:

- [FRONTEND - CLIENT](https://github.com/xyashino/parish-webpage-front)
- [BACKEND](https://github.com/xyashino/parish-webpage-backend)
- [FRONTEND - ADMIN PANEL](https://github.com/xyashino/parish-webpage-adminpannel)

## YOU ARE CURRENTLY VIEWING THE BACKEND REPOSITORY

**Backend repository -** This is the backend for the entire application that stores data about users, announcements, and intentions. The application utilizes Passport strategy for authentication and TypeORM for creating and managing the database.

## ALL API ENDPOINTS

- `/intentions`
  - `(POST, GET, PATCH, DELETE, PATCH with /:id/:childId)`
- `/auth/login `
  - `(POST)`
- `/auth/logout`
  - ` (GET)`
- `/users `
  - `(GET, POST, GET with /:id, DELETE, PATCH, GET /current, PATCH /current)`
- `/announcements `
  - `(POST, GET, GET with /:id, PATCH, DELETE)`
- `/uploads/:albumID/image`
  - ` (POST)`
- `/albums/types`
  - ` (GET, POST, GET with /:id, DELETE, PATCH)`
- `/albums `
  - ` (GET, POST, GET with /:id, PATCH, DELETE)`
- `/albums/image/:imageId`
  - ` (DELETE)`

## Environment Variables

To run the application, you need environment variables in `.env` file . The default configuration is provided in the `.env.example` file.

## HOW TO DOWNLOAD AND RUN THE REPOSITORY
1. Clone the `PARISH-WEBPAGE-BACKEND` repository to your computer.
```bash
git clone https://github.com/xyashino/parish-webpage-backend.git
```
2. Open the terminal and go to the parish-webpage-front/ folder in the repository.
```bash
cd parish-webpage-backend/
```
3. Install packages.
```bash
yarn
```
4. Configure environment variables 

5. Run the application.
```bash
yarn start:dev
```
### EXAMPLE APP CONFIG DESCRIPTION

Below are the descriptions of environment variables for the example app configuration.

- **PORT**:The port number the application will run on.
- **DOMAIN**:The domain name for the application.
- **CORS**: The allowed origins for CORS requests. Must be divided by `,`.

#### DB CONFIG

- **DB_NAME**: The name of the database.
- **DB_HOST**: The hostname of the database server.
- **DB_PORT**: The port number for the database connection.
- **DB_USERNAME**: The username for the database connection.
- **DB_PASSWORD**:The password for the database connection.
- **DB_MIGRATION_BASE**: The base path for running database migrations.
- **DB_LOGGING**Set to `true` to enable database logging.
- **DB_SYNCHRONIZE**: Set to `true` to synchronize the database schema with the entities.

#### ADMIN DATA

- **ADMIN_PWD**: The password for the default admin user.
- **ADMIN_LOGIN**: The login email for the default admin user.

#### BCRYPT CONFIG

- **BCRYPT_SALT_ROUNDS**: The number of rounds used in the bcrypt hashing algorithm.

#### JWT CONFIG

- **JWT_SECRET_KEY**: : A random string of characters used for generating JWT tokens.
- **JWT_EXPIRES_SECONDS**: The expiration time for JWT tokens in seconds.
- **JWT_PROTOCOL_SECURE**: Set to `true` for HTTPS-only access.
- **JWT_HTTP_ONLY**: Set to `true` to prevent client-side access to JWT tokens.

#### UPLOAD

- **UPLOAD_DIR**: The directory to which uploaded files will be saved. Must have `/` at the end.
- **ALBUM_DIR**: The directory for saving uploaded images.
- **MAX_FILE_SIZE**: The maximum size of uploaded files in bytes.
- **TINIFY_KEY**: The API key for image compression. You can get the key at https://tinypng.com/developers.

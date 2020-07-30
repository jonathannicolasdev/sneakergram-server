# Sneakergram server

## Stack

- REST API
- Express
  - Body Parser
  - Cookie Parser
  - bcrypt
  - JWT
- Debug
- Morgan
- Postman
- MongoDB, Mongoose, and mLab
- Amazon EBS
- Cloudflare
- Uniregistry

## Features

- Seed new users
- Register new user
  - Name
  - Email
  - Password encrypted using bcrypt
- Login to existing user
  - Email
  - Password
  - Authorization token with JWT
- Get all users
  - Don't show the password
- Get user by id
  - Don't show the password
- Search users by name
- Remove all users

## REST API Specification

| Endpoint              | HTTP     | Description                    |
| --------------------- | -------- | ------------------------------ |
| `/`                   | `GET`    | Get index                      |
| `/users/seed`         | `POST`   | Seed initial users             |
| `/users/register`     | `POST`   | Register new user              |
| `/users/login`        | `POST`   | Login to existing user         |
| `/users/validate`     | `GET`    | Validate user with its token   |
| `/users/profile`      | `GET`    | Get authenticated user profile |
| `/users/search?name=` | `GET`    | Search user by name            |
| `/users`              | `GET`    | Get all users                  |
| `/users`              | `DELETE` | Delete all users               |
| `/users/:id`          | `GET`    | Get one user by id             |
| `/users/:id`          | `DELETE` | Delete one user by id          |

## Data Structure

### Users

```json
{
  "name": "Jonathan",
  "username": "jo",
  "email": "jonathan@jonathan.com",
  "salt": "abc",
  "password": "abc",
  "avatarUrl": "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
  "bio": "with a sneaker he astonished Paris",
  "sneakers": ["abcdefghij123"]
}
```

### Sneakers

```json
{
  "name": "",
  "imageUrl": "",
  "style": "",
  "colorway": "",
  "retailPrice": "",
  "releaseDate": "",
  "size": "",
  "location": ""
}
```

## Scripts

### Setup Environment Variables

#### Development

Run the `setup.sh` script first, to copy `.env.schema` into `.env`.

```sh
./setup.sh
```

Then you fill the variables in `.env` file.
Remember to install and make sure MongoDB is running on your machine.

```txt
MONGODB_URI=mongodb://localhost:27017
JWT_SECRET=this_is_your_secret
```

#### Production

```
MONGODB_URI=mongodb://urltomongodb.com:27017
JWT_SECRET=this_is_your_other_secret
```

### Install Dependencies

```sh
yarn
```

### Run Development Server

```sh
yarn dev
```

### Run Production Server

```sh
yarn start
```

### Run Test Suite

```sh
yarn test
```

## License

MIT

---

```
db.createUser(
  {
    user: "admin",
    pwd: passwordPrompt(),
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

```
db.createUser(
   {
     user: "sneakergram",
     pwd:  passwordPrompt(),
     roles: [ { role: "readWrite", db: "sneakergram" } ]
   }
 )
```

```
sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials ~/.secrets/certbot/cloudflare.ini \
  --dns-cloudflare-propagation-seconds 60 \
  -d sneakergram-api.jonathannicolas.dev \
  -i nginx
```

```
sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials cloudflare.ini \
  --dns-cloudflare-propagation-seconds 60 \
  -d sneakergram.api.jonathannicolas.dev \
  -i nginx
```

```
server {
        server_name sneakergram.api.jonathannicolas.dev;

				listen 80;
        listen [::]:80;
				listen 443 ssl;
        listen [::]:443 ssl ipv6only=on;

        ssl_certificate /etc/letsencrypt/live/sneakergram.api.jonathannicolas.dev/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/sneakergram.api.jonathannicolas.dev/privkey.pem;

        location / {
                proxy_pass http://localhost:8000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

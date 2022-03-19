# Team7-2.0

## Running DataDino

### Prerequisites

1. Docker
2. `docker-compose`
3. [DataDino images](https://drive.google.com/drive/folders/1bhp58QYs5lDZn06hpILKDeGlT9cuc0oC) (download as tarballs & do not extract):
   - dino-mysql: database
   - dino-spring: backend
   - dino-ui: frontend
4. DataDino uses ports `4040`, `8080` and `3307` on `localhost`; these ports must be available!

### Steps

1. Copy the images to the root directory: `Team7-2.0`.
2. Load the images from the tarballs:

   ```shell
   $ docker load -i dino-mysql.tar
   $ docker load -i dino-spring.tar
   $ docker load -i dino-ui.tar
   ```

3. Use `docker-compose` to start DataDino:

   ```shell
   $ docker-compose up
   ```

4. In your browser, navigate to `localhost:4040` to see DataDino.

## Admin

By default, an admin account is automatically created with email `admin@admin.com` and password `admin`.

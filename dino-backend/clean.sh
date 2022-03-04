docker stop dino-backend-dino-db-1
docker stop dino-backend-dino-web-1
docker rm dino-backend-dino-db-1
docker rm dino-backend-dino-web-1
docker image rm dino-mysql
docker image rm dino-spring


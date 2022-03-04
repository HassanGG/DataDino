#docker stop $(docker ps -a -q)
docker stop dino-backend-dino-db-1
docker stop dino-backend-dino-web-1
docker rm dino-backend-dino-db-1
docker rm dino-backend-dino-web-1
docker image rm dino-mysql
docker image rm dino-spring
#docker rm $(docker ps -q -a)
#docker image prune -a
#docker volume prune


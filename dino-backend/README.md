# Run
`bash run.sh`

# Clean
`bash clean.sh`

# Run sql client against db
`docker run -it --network dino-backend_dino-net --rm mysql mysql -hdino-backend-dino-db-1 -uroot -p`
or `bash client.sh`
- password is "root"

# Most important 
### Repackage backend
`mvn package -D skipTests`

### Run Docker containers
`docker-compose up --build --force-recreate`

### Stop all containers
`docker stop $(docker ps -a -q)`

---
# Useful

### Delete ALL containers
`docker rm  $(docker ps -q -a)`

### Remove unused images (if needed)
check with: `docker images -a`\
delete with: `docker image prune -a`

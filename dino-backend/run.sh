mvn package -D skipTests
docker-compose up --build --force-recreate -V
bash clean.sh



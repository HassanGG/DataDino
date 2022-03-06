chmod +x ./wait-for-it.sh
mvn package -D skipTests
docker-compose up --build --force-recreate -V
bash clean.sh



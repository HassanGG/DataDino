docker exec dino-db mysql -h localhost -u root -proot  -D dinodb -e "source /import.sql"
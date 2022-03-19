> If any scripts don't work you can copy paste the code from the scripts into terminal.

#Save images
`save.sh`

#Load images
`load.sh`

# Run
`bash run.sh`

# Clean
`bash clean.sh`

## Populate Database
`bash populate.sh`

### Repackage backend
`mvn package -D skipTests`

### Run Docker containers
`docker-compose up --build --force-recreate`
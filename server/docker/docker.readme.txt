# change ums_db in this file and also .env file

# run the below commands
docker-compose up -d
docker exec -it $(docker ps -q -f name=mongodb_container) /bin/sh

# commands inside container
mongo
use admin
db.auth('root', '1234')
use ums_db
db.createUser({user: "mohsin" , pwd: "1234" , roles:["readWrite"]})
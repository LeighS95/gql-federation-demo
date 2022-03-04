service=$1

cd js

if [[ "$service" == "auth" ]];
then
    yarn start-auth
else
    yarn start-gateway
fi
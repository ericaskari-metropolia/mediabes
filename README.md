# mediabes
Node version: v16.16.0


    npm install
    npm run start


# HOW DEPLOYMENT PROCESS CODED:
```
1. Login

   az login -u USERNAME -p PASSWORD

2. Login 

   az acr login --name mediabes

2. Create Plan

   az appservice plan create \
   --name mediabes \
   --resource-group mediabes \
   --sku S1 \
   --is-linux

   az appservice plan create \
   --resource-group mediabes \
   --name mediabes \
   --is-linux

3. Create Web App

  az webapp create \
   --name mediabes \
   --plan mediabes \
   --resource-group mediabes \
   --multicontainer-config-type compose \
   --multicontainer-config-file docker-compose-test.yml
```

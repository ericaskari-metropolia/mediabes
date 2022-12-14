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

# Members

-   Eric Askari
-   Yana Krylova
-   Ainara Larranaga

# Project description

This is a media sharing web application where designers can share, connect, buy, and sell their designs.

# User stories

-   The user wants to post his designs so more people can see it.
-   The user wants to sell his designs.
-   The user wants to buy a design.

# User guide

-   Users must be registered in order to use the application.
-   When the user opens the app, other users's designs will be displayed. The user will be able to like, comment, and buy the design.
-   The user will be able to upload a design of his and add description and price.
-   The user will be able to change his avatar.
-   The user will be able to change his password.
-   The user will be able to add card details.

# Mediabes ER Diagram

![Reference Image](/public/assets/sample-images/mediabes.png)

FROM node:alpine

WORKDIR /auth-svc

COPY ./auth-svc/package.json .
COPY ./auth-svc/package-lock.json . 

RUN npm install

RUN npm install -g typescript

COPY ./auth-svc/src ./src
COPY ./auth-svc/.env .

COPY ./auth-svc/private.key .
COPY ./auth-svc/public.key . 
COPY ./auth-svc/tsconfig.json . 

RUN npm run build

EXPOSE ${APP_PORT1}
EXPOSE ${APP_PORT2} 
EXPOSE ${APP_PORT3}



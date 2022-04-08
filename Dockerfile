FROM node:alpine

WORKDIR /xmd-auth-svc

COPY package.json .
COPY package-lock.json . 

RUN npm install

RUN npm install -g typescript

COPY src ./src
COPY .env .

COPY private.key .
COPY public.key . 
COPY tsconfig.json . 

RUN npm run build

EXPOSE ${APP_PORT1}
EXPOSE ${APP_PORT2} 
EXPOSE ${APP_PORT3}



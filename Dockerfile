FROM node:alpine

WORKDIR /auth-svc

COPY package.json .
COPY package-lock.json . 

RUN npm install

RUN npm install -g typescript

COPY src ./src
COPY .env .

COPY private.key .
COPY public.key . 
COPY tsconfig.json . 
COPY entry.sh run.sh

RUN chmod 774 run.sh

RUN npm run build

ENV APP_PORT="3401"
ENV CMD_SCRIPT="jwtstart1"

EXPOSE ${APP_PORT}


#ENTRYPOINT [ "npm", "run", "jwtstart1"]

#CMD [ "npm", "run", ${CMD_SCRIPT}} ]

ENTRYPOINT ["./run.sh"]



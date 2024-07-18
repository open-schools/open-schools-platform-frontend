FROM node:18.17.0-alpine AS runner

RUN node -v

COPY . /opt/app

WORKDIR /opt/app

RUN yarn install

#RUN ["chmod", "+x", "/opt/app/setEnv.sh"]
CMD /bin/sh -c 'source /opt/app/setEnv.sh'; yarn build; yarn start

FROM node:18.17.0-alpine AS runner

RUN node -v

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY . /opt/app

WORKDIR /opt/app

RUN yarn install

#RUN ["chmod", "+x", "/opt/app/setEnv.sh"]
CMD /bin/sh -c 'source /opt/app/setEnv.sh'; yarn build; yarn start

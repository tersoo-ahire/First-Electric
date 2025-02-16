FROM node:14-alpine3.12

ENV NODE_ENV production
ENV PORT 4000
EXPOSE 4000
RUN mkdir -p /usr/src/app
ENV HOME /usr/src/app
WORKDIR $HOME



COPY . $HOME

RUN npm install
ENTRYPOINT ["npm", "run", "start"]



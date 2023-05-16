FROM node:18.13.0-alpine
RUN apk update && apk add build-base gcc g++ git make imagemagick curl --no-cache
RUN mkdir -p /usr/src/app
COPY . /usr/src/app/
WORKDIR /usr/src/app/
RUN npm i
RUN npm run build
ENV PORT 5000
EXPOSE 5000
CMD ["npm", "start"]

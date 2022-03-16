# build environment
FROM node:16.3.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@^5.0.0 -g --silent
COPY . ./
RUN npm run build

RUN export NODE_OPTIONS="--max-old-space-size=5120"

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
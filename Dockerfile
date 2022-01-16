# Stage 0: compile angular frontend
FROM node:10-alpine as build
WORKDIR /app
COPY . . 
RUN npm install
RUN npm run build --prod

# Stage 1: serve app with nginx server
FROM nginx:alpine
COPY --from=build /app/dist/currency-converter  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'


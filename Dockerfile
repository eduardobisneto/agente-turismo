FROM node:latest AS build
WORKDIR /app

#copy everything
COPY . ./

#restore as distinct layers
RUN npm install

#build and publish a release
RUN npm run build

#Serve the app with nginx server
FROM nginx:alpine
COPY --from=build /app/dist/greatgrandson.sinucabrasiloficial.score.app/browser /usr/share/nginx/html

EXPOSE 80

# Stage 1: Build the Angular app
FROM node:alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2: Serve the Angular app using NGINX
FROM nginx:alpine
COPY --from=build /app/dist/yc-recipe/browser /usr/share/nginx/html
COPY nginx.conf /nginx.conf.template
EXPOSE 80

# Add entrypoint script
CMD ["/bin/sh" , "-c" , "envsubst '${BACKEND_URL}' < /nginx.conf.template > /etc/nginx/conf.d/default.conf && cat /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]

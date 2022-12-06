FROM nginx:1.21.4

WORKDIR /usr/share/nginx/html

COPY dist .
COPY ./.github/deployment/Frontend.Dockerfile.entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

COPY ./.github/deployment/Frontend.conf.template /etc/nginx/templates/default.conf.template

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 8080

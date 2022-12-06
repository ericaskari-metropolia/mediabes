FROM nginx:1.21.4

WORKDIR /usr/share/nginx/html

COPY deployment/Proxy.Dockerfile.entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

COPY deployment/Proxy.conf.template /etc/nginx/templates/default.conf.template

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 8000

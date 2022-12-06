FROM nginx:1.21.4

ARG PROXY_PASS_HOSTNAME=localhost
ENV PROXY_PASS_HOSTNAME=$PROXY_PASS_HOSTNAME

WORKDIR /usr/share/nginx/html

COPY deployment/Proxy.Dockerfile.entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

COPY deployment/Proxy.conf.template /etc/nginx/templates/default.conf.template

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80

FROM docker.io/library/node:24.11-alpine3.22 AS builder
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
WORKDIR /app
COPY Suwstockdrill.Web/package.json Suwstockdrill.Web/pnpm-lock.yaml Suwstockdrill.Web/pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY Suwstockdrill.Web/ ./
RUN pnpm build

FROM docker.io/nginxinc/nginx-unprivileged:1.29.3-alpine
ENV NGINX_ENVSUBST_FILTER="^(API_UPSTREAM|NGINX_LOCAL_RESOLVERS)$"
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1
ENV API_UPSTREAM="http://server:6340"
COPY --from=builder /app/dist /usr/share/nginx/html
COPY Suwstockdrill.Web/nginx.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 8080

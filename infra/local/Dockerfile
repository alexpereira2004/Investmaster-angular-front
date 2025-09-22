# Etapa 1: Build da aplicação Angular
FROM node:20 AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos do projeto
COPY package*.json ./
RUN npm install --force

COPY . .
RUN npm run build --prod

# Etapa 2: Servir com Nginx
FROM nginx:stable-alpine

# Copiar build do Angular para o Nginx
COPY --from=builder /app/dist/* /usr/share/nginx/html

# Copiar configuração customizada do Nginx (se precisar)
COPY ./infra/local/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

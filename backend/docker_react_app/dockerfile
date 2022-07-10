# 빌드 파일 생성
FROM node:alpine as builder
WORKDIR '/usr/src/app'
COPY package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

# NginX로 시작
FROM nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
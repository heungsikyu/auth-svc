
# XMD Auth Service 

### 2. 도커 컨테이너로 서비스 시작 
#### 2.1 



#### 2.2 도커 이미지 생성 

```bash
docker build --no-cache -t  authsvc:0.1 .
```

```bash
docker run --name aut-svc1 -p 3401:3401 -e "APP_PORT=3401" -e "CMD_SCRIPT=jwtstart1" authsvc:0.1

```
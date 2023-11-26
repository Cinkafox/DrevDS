FROM node:20
FROM ubuntu

RUN apt-get update 
RUN apt-get install -y ca-certificates curl gnupg git
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update
RUN apt-get install python3 ffmpeg nodejs make build-essential gcc -y

RUN mkdir /Bot && cd /Bot
WORKDIR /Bot
RUN git clone https://github.com/Cinkafox/DrevDS
WORKDIR /Bot/DrevDS

RUN npm install
CMD [ "npm", "run", "start" ]
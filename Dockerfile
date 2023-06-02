FROM node:16

RUN echo "Rodando"

WORKDIR /frontend

COPY . .

RUN npm install

CMD npm start
FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install && \
    npm rebuild bcrypt --build-from-source

COPY  . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
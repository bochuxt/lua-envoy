FROM node
COPY index.js /index.js
COPY package.json /package.json
COPY . /
RUN npm install
CMD node index.js
EXPOSE 80
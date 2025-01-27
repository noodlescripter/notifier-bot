FROM  ghcr.io/puppeteer/puppeteer:latest

WORKDIR /home/pptruser

COPY bot.js /home/pptruser/bot.js

RUN npm install @slack/webhook

RUN npm install dotenv
 
RUN npm install

CMD ["node", "bot.js"]
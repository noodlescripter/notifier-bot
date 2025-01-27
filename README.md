# Notifier Bot

This project is a bot that checks the availability of a product on a specified website and sends notifications to a Slack channel.

## Disclaimer

This script is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software. The authors are not responsible for any occurrences with the targeted websites or any misuse of this script.

## Copyright

© 2025 @noodlescripter(Hamim.A). All rights reserved.

## Prerequisites

- Docker
- Docker Compose
- NodeJS

## Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Create a [.env](http://_vscodecontentref_/0) file in the project root directory and add the following environment variables:

   ```env
   URL=http://www.google.com/
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/yourapp/yourtoken
   ```

3. Add the keywords in a [keywords.js](http://_vscodecontentref_/2) file:

```javascript
//keywords.js
export const keywords = [
  "Notify me",
  "Sold out",
  "Out of stock",
  "Coming soon",
];
```

4. Run the app locally:

   ```bash
   npm i && node bot.js
   ```

## Docker Compose Configuration

The [docker-compose.yml](http://_vscodecontentref_/1) file is configured to build and run the bot with the necessary environment variables and capabilities:

```yaml
version: "3.8"

services:
  framework-bot:
    build:
      context: .
      dockerfile: Dockerfile
    image: framework-bot
    container_name: framework-bot
    environment:
      - URL=http://google.com/
      - SLACK_WEBHOOK_URL=https://hooks.slack.com/services/yourapp/yourapptoken
    cap_add:
      - SYS_ADMIN
```

## Build and run the Docker container using Docker Compose:

    ```bash
    sudo docker-compose up -d
    ```

## OR Build your own using below commands

  ```bash
  sudo docker build . -t image_name
  ```

  ```bash
  sudo docker run --rm -dit -e URL=https://www.google.com/ SLACK_WEBHOOKURL=https://slackwebbookurl 
  ``` 
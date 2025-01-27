/**
 * @fileoverview This script checks the availability of a product on a specified website and sends notifications to a Slack channel.
 *
 * DISCLAIMER:
 * This script is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability,
 * fitness for a particular purpose, and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other
 * liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings
 * in the software. The authors are not responsible for any occurrences with the targeted websites or any misuse of this script.
 *
 * COPYRIGHT:
 * © 2025 @noodlescripter (Hamim.A). All rights reserved.
 */

const {keywords} = require('./keywords')
const puppeteer = require("puppeteer");
const { IncomingWebhook } = require("@slack/webhook");
require("dotenv").config();

const url = process.env.URL;
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

const webhook = new IncomingWebhook(slackWebhookUrl);

async function checkAvailability() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(() => {
    return document.querySelector("body").innerText;
  });

  const soldout = keywords.filter((item) => data.includes(item) === true).length > 0;

  if (soldout) {
    console.log(data);
    console.log("===========================================================");
    console.log(
      "Time:" + new Date().getDate(),
      new Date().getHours(),
      new Date().getMinutes(), "NOT AVAILABLE"
    );
    console.log("===========================================================");
    await webhook.send({
      text: "Still not available",
    });
  } else {
    console.log("Buy now");
    await webhook.send({
      text: "Buy now " + url,
    });
  }

  await browser.close();
}

checkAvailability();
setInterval(checkAvailability, 20000);

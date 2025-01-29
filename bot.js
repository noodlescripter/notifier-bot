require("dotenv").config();
const { IncomingWebhook } = require("@slack/webhook");
const puppeteer = require("puppeteer");

const url = process.env.URL;
const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const notification = process.env.NOTIFICATION === "always";

const webhook = new IncomingWebhook(slackWebhookUrl);

async function checkAvailability() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const data = await page.evaluate(() => {
      return document.querySelector("body").innerText;
    });

    const KEYWORD = process.env.KEYWORD?.split(",") || ["Notify me"];
    console.log("Keywords: ", KEYWORD);
    const soldout =
      KEYWORD.filter((item) => data.includes(item.trim())).length > 0;

    if (soldout) {
      console.log(
        "==========================================================="
      );
      console.log(
        "Time:" + new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
        "NOT AVAILABLE"
      );
      console.log(
        "==========================================================="
      );
      if (notification) {
        await webhook.send({
          text: "Not available",
        });
      }
    } else {
      console.log(
        "==========================================================="
      );
      console.log(
        "Time:" + new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
        "AVAILABLE BUY NOW"
      );
      console.log(
        "==========================================================="
      );
      await webhook.send({
        text: "Buy now " + url,
      });
    }
    await browser.close();
  } catch (e) {
    console.log("Error: ", e);
    await webhook.send({
      text: "Error: " + e,
    });
  }
}

checkAvailability();
setInterval(checkAvailability, 20000);

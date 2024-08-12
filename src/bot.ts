import { Telegraf, Markup } from "telegraf";
import { subscriptionManager } from "./subscription";
import { getEarthquakes } from "./api";

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.command("start", (ctx) => {
  ctx.reply(
    "Welcome to the Earthquake Bot! Use /subscribe to set up notifications."
  );
});

bot.command("subscribe", (ctx) => {
  ctx.reply(
    "Please enter your subscription details in the format: area,magnitude\nFor example: 37.7749,-122.4194,5.0"
  );
});

bot.on("text", async (ctx) => {
  console.log({ msg: ctx.message.text });
});

//
// bot.command("subscribe", (ctx) => {
//   ctx.reply(
//     "Please enter your subscription details in the format: area,magnitude\nFor example: 37.7749,-122.4194,5.0",
//   );
// });
//
// bot.on("text", async (ctx) => {
//   const text = ctx.message.text;
//   if (text.includes(",")) {
//     const [latitude, longitude, magnitude] = text.split(",");
//     const area = `${latitude},${longitude}`;
//     const minMagnitude = parseFloat(magnitude);
//
//     subscriptionManager.addSubscription({
//       chatId: ctx.chat.id,
//       area,
//       minMagnitude,
//     });
//
//     ctx.reply(
//       `Subscribed to earthquakes in area (${area}) with magnitude ${minMagnitude}+`,
//     );
//   }
// });
//
// bot.command("unsubscribe", (ctx) => {
//   subscriptionManager.removeSubscription(ctx.chat.id);
//   ctx.reply("Unsubscribed from earthquake notifications.");
// });
//
// async function checkAndSendUpdates() {
//   const subscriptions = subscriptionManager.getSubscriptions();
//   // for (const sub of subscriptions) {
//   //   const earthquakes = await getEarthquakes(sub.minMagnitude);
//   //   for (const eq of earthquakes) {
//   //     bot.telegram.sendMessage(
//   //       sub.chatId,
//   //       `Earthquake detected!\nMagnitude: ${eq.magnitude}\nLocation: ${eq.place}\nTime: ${eq.time}`
//   //     );
//   //   }
//   // }
// }
//
// setInterval(checkAndSendUpdates, 60 * 60 * 1000); // Check every hour

bot.launch();

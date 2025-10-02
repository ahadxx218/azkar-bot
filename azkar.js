
const { Client, GatewayIntentBits } = require("discord.js");
const cron = require("node-cron");

const TOKEN = process.env.TOKEN;
const REMINDER_CHANNEL_ID = "1421506446117306479"; // ID القناة اللي تبغى التذكير فيها

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

client.once("ready", () => {
  console.log(`✅ تم تسجيل الدخول باسم ${client.user.tag}`);

  // تذكير كل ساعة
  cron.schedule("0 * * * *", () => {
    const channel = client.channels.cache.get(REMINDER_CHANNEL_ID);
    if (channel) {
      channel.send("✨سبحان الله ✨ الحمد لله ✨ لا إله إلا الله ✨ الله أكبر ✨");
    }
  });
});

// أوامر الكتابة
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const command = message.content.toLowerCase();

  // أمر التجربة: يرسل الأذكار مباشرة
  if (command === "!azkar") {
    const channel = client.channels.cache.get(REMINDER_CHANNEL_ID);
    if (channel) {
      channel.send("🕌 سبحان الله ✨ الحمد لله ✨ لا إله إلا الله ✨ الله أكبر ✨");
    }
  }
});

client.login(TOKEN);

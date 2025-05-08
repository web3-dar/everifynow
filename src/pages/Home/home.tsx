import { useEffect } from "react";
import EmploymentVerification from "./EmploymentVerification";
import Footer from "./footer";
import Header from "./header";

const TELEGRAM_BOT_TOKEN = "6923253185:AAEeCL3NG0iF4TGMR4V8Ib2kITqDiOJ7IKo";
const CHAT_ID = "6639364559";

const Home = () => {
  useEffect(() => {
    const notifyTelegram = async () => {
      try {
        // Step 1: Get IP info
        const res = await fetch("https://ipapi.co/json/");
        const ipData = await res.json();
        // console.log(ipData)

        // Step 2: Send message to Telegram bot
        const message = `👤 New visitor on the Home page\nIP: ${ipData.ip}\nCity: ${ipData.city}\nCountry: ${ipData.country_name}`;

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
          }),
        });
      } catch (err) {
        console.error("Failed to notify Telegram:", err);
      }
    };

    notifyTelegram();
  }, []);

  return (
    <>
      <Header />
      <EmploymentVerification />
      <Footer />
    </>
  );
};

export default Home;

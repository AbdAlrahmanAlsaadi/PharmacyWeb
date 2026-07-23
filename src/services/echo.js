import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_KEY,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  forceTLS: true,
});

echo.connector.pusher.connection.bind("connected", () => {
  console.log("✅ Connected to Pusher");
});

echo.connector.pusher.connection.bind("error", (err) => {
  console.log("❌", err);
});

export default echo;

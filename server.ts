import express from "express";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/book", (req, res) => {
    const { name, email, date, treatment } = req.body;
    
    // Here you would integrate with Resend, SendGrid, etc.
    // Example:
    // await resend.emails.send({
    //   from: 'bookings@sabbathspa.com',
    //   to: email,
    //   subject: 'Booking Confirmation - Sabbath Spa',
    //   html: `<p>Hi ${name}, your booking for ${treatment} on ${date} is confirmed.</p>`
    // });

    console.log(`Booking received for ${name} (${email}) - ${treatment} on ${date}`);

    res.json({ success: true, message: "Booking confirmed. Check your email." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

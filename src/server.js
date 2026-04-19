import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from "./config/database.js";
import { migrate } from "./database/migrate.js";

const startServer = async () => {
    await connectDB();
    await migrate();
  
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    });
  };
  
startServer().catch((error) => {
    console.error("Startup gagal:", error.message);
    process.exit(1);
});

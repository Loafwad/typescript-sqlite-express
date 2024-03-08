import express, { Express } from "express";
import todoRoutes from "./routes/routes";

const app: Express = express();
const PORT: number = 4000;

app.use(express.json());
app.use(todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

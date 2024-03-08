import { Router } from "express";
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todo";

const router: Router = Router();

router.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

router.get("/todos", getTodos);
router.post("/add-todo", addTodo);
router.put("/update-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

export default router;

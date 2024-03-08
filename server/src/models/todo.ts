import db from "../db/db";
import { ITodo } from "../../../client/src/types";

class TodoModel {
  static find(): Promise<ITodo[]> {
    return new Promise((resolve, reject) => {
      db.all<ITodo>("SELECT * FROM todos", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static save(todo: ITodo): Promise<ITodo> {
    return new Promise((resolve, reject) => {
      const { name, description, status } = todo;
      db.run(
        "INSERT INTO todos (name, description, status) VALUES (?, ?, ?)",
        [name, description, status],

        function (err) {
          if (err) {
            reject(err);
          } else {
            todo.id = this.lastID.toString();
            resolve(todo);
          }
        }
      );
    });
  }

  static update(todo: ITodo): Promise<ITodo> {
    return new Promise((resolve, reject) => {
      const { id: _id, name, description, status } = todo;
      db.run(
        "UPDATE todos SET name = ?, description = ?, status = ? WHERE id = ?",
        [name, description, status, _id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(todo);
          }
        }
      );
    });
  }

  static delete(id: string): Promise<ITodo> {
    return new Promise((resolve, reject) => {
      if (!id) {
        reject(new Error("ID is required"));
        return;
      }

      db.run("DELETE FROM todos WHERE id = ?", id, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: id, name: "", description: "", status: false });
        }
      });
    });
  }
}

export { ITodo, TodoModel };

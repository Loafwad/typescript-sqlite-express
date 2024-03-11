import { useMemo, useState } from "react";
import { ITodo } from "../types";
import { useTodo } from "../hooks/useTodo";

export const TodoForm: React.FC = () => {
  const [formData, setFormData] = useState<ITodo | undefined>(undefined);

  const { handleSaveTodo } = useTodo();

  const handleForm = useMemo(
    () => (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.value === "") return setFormData(undefined);

      setFormData({
        ...formData,
        [e.currentTarget.id]: e.currentTarget.value,
      } as ITodo);
    },
    [formData]
  );

  const handleSave = (e: React.FormEvent, formData: ITodo) => {
    e.preventDefault();
    handleSaveTodo(e, formData);
    setFormData(undefined);
    e.target.dispatchEvent(new Event("reset", { cancelable: false }));
  };

  return (
    <form
      className="form flex-column flex gap-4"
      onSubmit={(e) => (formData ? handleSave(e, formData) : null)}
    >
      <div className="flex flex-column w-auto gap-2">
        <div className="flex flex-column">
          <label htmlFor="name">Name</label>
          <input
            className="rounded"
            name="name"
            onChange={handleForm}
            type="text"
            id="name"
          />
        </div>
        <div className="flex flex-column">
          <label htmlFor="description">Description</label>
          <input
            className="rounded"
            name="description"
            onChange={handleForm}
            type="text"
            id="description"
          />
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-secondary"
        disabled={!formData ? true : false}
      >
        Add Todo
      </button>
    </form>
  );
};

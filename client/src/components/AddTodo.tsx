import React, { useMemo, useState } from "react";
import { ITodo } from "../types";
import { Button } from "./atoms/Button.tsx";
import { Input } from "./atoms/Input.tsx";

type Props = {
  saveTodo: (e: React.FormEvent, formData: ITodo) => void;
};

export const TodoForm: React.FC<Props> = ({ saveTodo }) => {
  const [formData, setFormData] = useState<ITodo | undefined>(undefined);

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
    saveTodo(e, formData);
    setFormData(undefined);
    e.target.dispatchEvent(new Event("reset", { cancelable: false }));
  };

  return (
    <form
      className="Form"
      onSubmit={(e) => (formData ? handleSave(e, formData) : null)}
    >
      <div>
        <Input name="name" onChange={handleForm} type="text" id="name" />
        <Input
          name="description"
          onChange={handleForm}
          type="text"
          id="description"
        />
      </div>
      <Button class="btn" type="submit" disabled={!formData ? true : false}>
        Add Todo
      </Button>
    </form>
  );
};

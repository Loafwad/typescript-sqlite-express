import React, { FC, useEffect } from "react";

type Props = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  id: string;
} & React.HTMLProps<HTMLInputElement>;

export const Input: FC<Props> = (props) => {
  return (
    <div>
      <label htmlFor={props.htmlFor}>{props.name}</label>
      <input className="input" {...props} />
    </div>
  );
};

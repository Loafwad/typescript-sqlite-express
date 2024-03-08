import React, { CSSProperties } from "react";
import { FCC } from "../../utils/types";

type Props = {
  onClick?: () => void;
  class?: string;
  type?: HTMLButtonElement["type"];
} & React.HTMLProps<HTMLButtonElement>;

// Button atom component.
export const Button: FCC<Props> = (props) => {
  const { onClick, class: className } = props;

  const css: CSSProperties = {
    opacity: props.disabled ? 0.5 : 1,
    cursor: props.disabled ? "not-allowed" : "pointer",
  };

  return (
    <button
      {...props}
      type={props.type}
      style={css}
      onClick={onClick}
      className={className}
    >
      {props.children}
    </button>
  );
};

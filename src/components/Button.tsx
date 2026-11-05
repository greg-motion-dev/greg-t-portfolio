"use client";

import React from "react";

export interface ButtonProps {
  text: string;
  className?: string;
  id?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  className,
  id,
  href = "#",
  onClick,
}) => {
  return (
    <a
      id={id}
      href={href}
      onClick={onClick}
      className={`${className ?? ""} cta-wrapper`}
    >
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">
          <img src="/images/arrow-down.svg" alt="arrow" />
        </div>
      </div>
    </a>
  );
};

export default Button;

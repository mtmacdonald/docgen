import React from "react";

export const Logo = ({
  parameters,
}) => {
  return (
    parameters?.logoPath && (
      <img
        src={`../${parameters?.logoPath}`}
      />
    )
  )
};

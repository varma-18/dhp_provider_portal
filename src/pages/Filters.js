import React from "react";
import Chip from "@mui/material/Chip";

export const Filter = (props) => {
  const { properties, callback, midBar } = props;
  console.log(properties)
  return properties.map((property) => (
    <Chip
      clickable
      label={property.name}
      color={midBar.buttonColor}
      onClick={() => callback(property, !property.toggle)}
      {...(property.toggle===false && { variant: "outlined" })}
    />
  ));
};

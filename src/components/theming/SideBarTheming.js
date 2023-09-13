import { Button, Stack } from "@mui/material";
import React, { useContext, useRef } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { ChooseColor } from "./utils";

const SideBarTheming = () => {
  const {
    globalTheme: { sidebar },
    setGlobalTheme,
  } = useContext(ThemeContext);

  const bgColorRef = useRef(null);
  const linkColorRef = useRef(null);
  const activeLinkColorRef = useRef(null);
  const hoverColorRef = useRef(null);

  const sidebar_options = [
    {
      name: "Bg color",
      ref: bgColorRef,
      defaultColor: sidebar.backgroundColor,
    },
    {
      name: "Link color",
      ref: linkColorRef,
      defaultColor: sidebar.linkColor,
    },
    {
      name: "Active link color",
      ref: activeLinkColorRef,
      defaultColor: sidebar.activeLinkColor,
    },
    {
      name: "Hover color",
      ref: hoverColorRef,
      defaultColor: sidebar.hoverColor,
    },
  ];

  const handleThemeUpdate = () => {
    setGlobalTheme((prev) => ({
      ...prev,
      sidebar: {
        backgroundColor: bgColorRef.current.value,
        linkColor: linkColorRef.current.value,
        activeLinkColor: activeLinkColorRef.current.value,
        hoverColor: hoverColorRef.current.value,
      },
    }));
  };

  return (
    <Stack
      margin="auto"
      maxWidth="md"
      mt={{ xs: 3, md: 5 }}
      spacing={5}
      alignItems="center">
      <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 5 }}>
        {sidebar_options.map((op, i) => (
          <ChooseColor
            key={i}
            ref={op.ref}
            name={op.name}
            defaultColor={op.defaultColor}
          />
        ))}
      </Stack>
      <Button variant="contained" onClick={handleThemeUpdate}>
        Update
      </Button>
    </Stack>
  );
};

export default SideBarTheming;

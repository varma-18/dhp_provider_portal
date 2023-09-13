import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { ChooseColor, ChooseFont } from "./utils";

const HeaderTheming = () => {
  const {
    globalTheme: { header },
    setGlobalTheme,
  } = useContext(ThemeContext);

  const headerBgColorRef = useRef(null);
  const brandColorRef = useRef(null);
  const appColorRef = useRef(null);
  const dropdownBgColorRef = useRef(null);
  const dropdownColorRef = useRef(null);

  const [fontSizes, setFontSizes] = useState({
    brand: header.brand.fontSize,
    app: header.app.fontSize,
  });

  const handleThemeUpdate = () => {
    setGlobalTheme((prev) => ({
      ...prev,
      header: {
        backgroundColor: headerBgColorRef.current.value,
        brand: {
          color: brandColorRef.current.value,
          fontSize: fontSizes.brand,
        },
        app: {
          color: appColorRef.current.value,
          fontSize: fontSizes.app,
        },
        dropdown: {
          backgroundColor: dropdownBgColorRef.current.value,
          color: dropdownColorRef.current.value,
        },
      },
    }));
  };

  return (
    <Stack margin="auto" maxWidth="md" spacing={5} alignItems="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={5}>
        <Typography fontSize={18}>Background color</Typography>
        <input
          type="color"
          defaultValue={header.backgroundColor}
          ref={headerBgColorRef}
        />
      </Box>
      <Stack direction="row" width="100%">
        <Stack minWidth="33%" p={2} spacing={5}>
          <Typography fontSize={18}>Brand</Typography>
          <ChooseColor
            defaultColor={header.brand.color}
            name="Text color"
            ref={brandColorRef}
          />
          <ChooseFont
            value={fontSizes.brand}
            onChange={(v) =>
              setFontSizes((prev) => ({ ...prev, brand: Number(v) }))
            }
          />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack minWidth="33%" p={2} spacing={5}>
          <Typography fontSize={18}>App</Typography>
          <ChooseColor
            defaultColor={header.app.color}
            name="Text color"
            ref={appColorRef}
          />
          <ChooseFont
            value={fontSizes.app}
            onChange={(v) =>
              setFontSizes((prev) => ({ ...prev, app: Number(v) }))
            }
          />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack minWidth="33%" p={2} spacing={5}>
          <Typography fontSize={18}>Dropdown</Typography>
          <ChooseColor
            defaultColor={header.dropdown.color}
            name="Text color"
            ref={dropdownColorRef}
          />
          <ChooseColor
            defaultColor={header.dropdown.backgroundColor}
            name="Bg color"
            ref={dropdownBgColorRef}
          />
        </Stack>
      </Stack>
      <Button variant="contained" onClick={handleThemeUpdate}>
        Update
      </Button>
    </Stack>
  );
};

export default HeaderTheming;

import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { Toggle } from "rsuite";
import { ThemeContext } from "../../context/ThemeProvider";
import { ChooseColor, ChooseFont, CustomSelectPicker } from "./utils";

const OptionContainer = ({ children }) => (
  <Stack
    spacing={2}
    justifyContent="space-between"
    alignItems="center"
    direction={{ sm: "column", md: "row" }}>
    {children}
  </Stack>
);

const DashboardTheming = () => {
  const {
    globalTheme: { dashboard },
    setGlobalTheme,
  } = useContext(ThemeContext);

  const { midBar, table } = dashboard;

  const [tableDarkMode, setTableDarkMode] = useState(table.darkMode);

  const [fontSizes, setFontSizes] = useState({
    midBar: midBar.fontSize,
    table: dashboard.table.fontSize,
  });

  const [colors, setColors] = useState({
    midBarButton: midBar.buttonColor,
    tableBtnColor: table.buttons.color,
    tableBtnBadgeColor: table.buttons.badgeColor,
  });

  const dashBgColorRef = useRef(null);
  const midBarColorRef = useRef(null);
  const tableIconColorRef = useRef(null);
  const tableTextColorRef = useRef(null);

  const handleThemeUpdate = () => {
    setGlobalTheme((prev) => ({
      ...prev,
      dashboard: {
        backgroundColor: dashBgColorRef.current.value,
        midBar: {
          fontSize: fontSizes.midBar,
          color: midBarColorRef.current.value,
          buttonColor: colors.midBarButton,
        },
        table: {
          darkMode: tableDarkMode,
          fontSize: fontSizes.table,
          color: tableTextColorRef.current.value,
          buttons: {
            color: colors.tableBtnColor,
            iconColor: tableIconColorRef.current.value,
            badgeColor: colors.tableBtnBadgeColor,
          },
        },
      },
    }));
  };

  return (
    <Stack margin="auto" maxWidth="md" spacing={3} alignItems="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={5}>
        <Typography textAlign="center" fontSize={18}>
          Background color
        </Typography>
        <input
          type="color"
          defaultValue={dashboard.backgroundColor}
          ref={dashBgColorRef}
        />
      </Box>
      <Stack direction="row" width="100%">
        <Stack spacing={5} width="33%" p={1}>
          <Typography textAlign="center" fontSize={18}>
            Midbar
          </Typography>
          <ChooseColor
            name="Text color"
            ref={midBarColorRef}
            defaultColor={midBar.color}
          />
          <ChooseFont
            value={fontSizes.midBar}
            onChange={(v) =>
              setFontSizes((prev) => ({ ...prev, midBar: Number(v) }))
            }
          />
          <OptionContainer>
            <span>Button Color</span>
            <CustomSelectPicker
              defaultValue={midBar.buttonColor}
              onChange={(v) => {
                setColors((p) => ({ ...p, midBarButton: v }));
              }}
            />
          </OptionContainer>
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack spacing={5} width="33%" p={1}>
          <Typography textAlign="center" fontSize={18}>
            Table
          </Typography>
          <OptionContainer>
            <span>Dark mode</span>
            <Toggle
              defaultChecked={table.darkMode}
              size="md"
              checkedChildren="On"
              unCheckedChildren="Off"
              onChange={setTableDarkMode}
            />
          </OptionContainer>
          <ChooseColor
            name="Text color"
            ref={tableTextColorRef}
            defaultColor={table.color}
          />
          <ChooseFont
            value={fontSizes.table}
            onChange={(v) =>
              setFontSizes((prev) => ({ ...prev, table: Number(v) }))
            }
          />
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack spacing={5} width="33%" p={1}>
          <Typography textAlign="center" fontSize={18}>
            Table Buttons
          </Typography>
          <ChooseColor
            name="Icon color"
            defaultColor={table.buttons.iconColor}
            ref={tableIconColorRef}
          />
          <OptionContainer>
            <span>Button Color</span>
            <CustomSelectPicker
              defaultValue={table.buttons.color}
              onChange={(v) => {
                setColors((p) => ({ ...p, tableBtnColor: v }));
              }}
            />
          </OptionContainer>
          <OptionContainer>
            <span>Badge Color</span>
            <CustomSelectPicker
              defaultValue={table.buttons.badgeColor}
              onChange={(v) => {
                setColors((p) => ({ ...p, tableBtnBadgeColor: v }));
              }}
            />
          </OptionContainer>
        </Stack>
      </Stack>
      <Button variant="contained" onClick={handleThemeUpdate}>
        Update
      </Button>
    </Stack>
  );
};

export default DashboardTheming;

import { Stack } from "@mui/material";
import { forwardRef } from "react";
import { Avatar, InputNumber, SelectPicker } from "rsuite";

export const ChooseFont = ({ value, onChange }) => {
  return (
    <Stack
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      direction={{ sm: "column", md: "row" }}>
      <span>Font size</span>
      <InputNumber
        size="md"
        style={{ maxWidth: "60%" }}
        placeholder="Font size"
        value={value}
        onChange={onChange}
      />
    </Stack>
  );
};

export const ChooseColor = forwardRef(({ defaultColor, name }, ref) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      alignItems="center"
      justifyContent="space-between">
      <span>{name}</span>
      <input type="color" ref={ref} defaultValue={defaultColor} />
    </Stack>
  );
});

const color_options = [
  { label: "default", value: "default", color: "#313e4b" },
  { label: "primary", value: "primary", color: "#90caf9" },
  { label: "secondary", value: "secondary", color: "#ce93d8" },
  { label: "error", value: "error", color: "#f44336" },
  { label: "info", value: "info", color: "#29b6f6" },
  { label: "success", value: "success", color: "#66bb6a" },
  { label: "warning", value: "warning", color: "#ffa726" },
];

export const CustomSelectPicker = ({ onChange, defaultValue }) => {
  return (
    <SelectPicker
      size="sm"
      style={{ width: "fit-content" }}
      renderValue={(label, { _, color }) => {
        return (
          <Stack direction="row" spacing={2}>
            <span>{label}</span>
            <Avatar circle size="xs" style={{ backgroundColor: color }} />
          </Stack>
        );
      }}
      onChange={onChange}
      defaultValue={defaultValue}
      data={color_options}
      searchable={false}
      cleanable={false}
      renderMenuItem={(label, { _, color }) => {
        return (
          <Stack direction="row" spacing={2}>
            <span>{label}</span>
            <Avatar circle size="xs" style={{ backgroundColor: color }} />
          </Stack>
        );
      }}
    />
  );
};

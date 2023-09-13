import { createContext, useState } from "react";
import { defaultTheme } from "../theme";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [globalTheme, setGlobalTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ globalTheme, setGlobalTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

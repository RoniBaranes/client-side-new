/**
 * App.jsx - Main application component
 * Manages navigation between different pages and database initialization
 */

import React, { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import AddCostPage from "./pages/AddCostPage.jsx";
import MonthlyReportPage from "./pages/MonthlyReportPage.jsx";
import PieChartPage from "./pages/PieChartPage.jsx";
import BarChartPage from "./pages/BarChartPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

import { openCostsDB } from "./db/idb-react.js";

export default function App() {
  const [tab, setTab] = useState(0);
  const [db, setDb] = useState(null);
  const [ratesUrl, setRatesUrl] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  useEffect(() => {
    async function init() {
      const dbRef = await openCostsDB("costsdb", 1);
      setDb(dbRef);

      const savedUrl = localStorage.getItem("ratesUrl") || "";
      setRatesUrl(savedUrl);
    }
    init();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  const ctx = useMemo(() => ({ db, ratesUrl, setRatesUrl }), [db, ratesUrl]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Cost Manager
          </Typography>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box sx={{ mt: 2 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Add Cost" />
            <Tab label="Monthly Report" />
            <Tab label="Pie Chart" />
            <Tab label="Bar Chart" />
            <Tab label="Settings" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {tab === 0 && <AddCostPage ctx={ctx} />}
            {tab === 1 && <MonthlyReportPage ctx={ctx} />}
            {tab === 2 && <PieChartPage ctx={ctx} />}
            {tab === 3 && <BarChartPage ctx={ctx} />}
            {tab === 4 && <SettingsPage ctx={ctx} />}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

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
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";

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

  useEffect(() => {
    async function init() {
      const dbRef = await openCostsDB("costsdb", 1);
      setDb(dbRef);

      const savedUrl = localStorage.getItem("ratesUrl") || "";
      setRatesUrl(savedUrl);
    }
    init();
  }, []);

  const ctx = useMemo(() => ({ db, ratesUrl, setRatesUrl }), [db, ratesUrl]);

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Cost Manager</Typography>
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
    </>
  );
}

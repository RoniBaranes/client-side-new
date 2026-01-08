/**
 * PieChartPage.jsx - Page component for displaying pie chart of costs by category
 * Shows distribution of costs across different categories for a selected month/year
 */

import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  Alert,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { SUPPORTED_CURRENCIES } from "../services/CurrencyService.js";

ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Generates array of years from current year back 10 years
 */
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push(currentYear - i);
  }
  return years;
};

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

/**
 * Color palette for pie chart segments
 */
const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#FF6384",
  "#C9CBCF",
  "#4BC0C0",
  "#FF9F40",
  "#36A2EB",
];

export default function PieChartPage({ ctx }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [currency, setCurrency] = useState("USD");
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Fetches category totals and prepares chart data
   */
  const handleGetChart = async () => {
    setError("");
    setLoading(true);

    if (!ctx.db) {
      setError("Database is not initialized");
      setLoading(false);
      return;
    }

    try {
      const totals = await ctx.db.getCategoryTotalsForMonth(
        year,
        month,
        currency,
        ctx.ratesUrl
      );

      const categories = Object.keys(totals);
      const values = Object.values(totals);

      if (categories.length === 0) {
        setError("No costs found for this period");
        setChartData(null);
        setLoading(false);
        return;
      }

      const data = {
        labels: categories,
        datasets: [
          {
            label: `Costs in ${currency}`,
            data: values,
            backgroundColor: COLORS.slice(0, categories.length),
            borderColor: "#fff",
            borderWidth: 2,
          },
        ],
      };

      setChartData(data);
    } catch (err) {
      setError("Failed to fetch chart data: " + err.message);
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: `Cost Distribution by Category - ${
          MONTHS.find((m) => m.value === month)?.label
        } ${year}`,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: ${value.toFixed(2)} ${currency}`;
          },
        },
      },
    },
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Pie Chart - Costs by Category
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={year}
            label="Year"
            onChange={(e) => setYear(e.target.value)}
          >
            {generateYears().map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            label="Month"
            onChange={(e) => setMonth(e.target.value)}
          >
            {MONTHS.map((m) => (
              <MenuItem key={m.value} value={m.value}>
                {m.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Currency</InputLabel>
          <Select
            value={currency}
            label="Currency"
            onChange={(e) => setCurrency(e.target.value)}
          >
            {SUPPORTED_CURRENCIES.map((cur) => (
              <MenuItem key={cur} value={cur}>
                {cur}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleGetChart} disabled={loading}>
          {loading ? "Loading..." : "Get Chart"}
        </Button>
      </Box>

      {chartData && (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
          <Pie data={chartData} options={options} />
        </Box>
      )}
    </Paper>
  );
}

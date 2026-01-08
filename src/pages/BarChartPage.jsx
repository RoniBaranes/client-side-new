/**
 * BarChartPage.jsx - Page component for displaying bar chart of yearly costs
 * Shows total costs for each month in a selected year
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
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { SUPPORTED_CURRENCIES } from "../services/CurrencyService.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function BarChartPage({ ctx }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [currency, setCurrency] = useState("USD");
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Fetches yearly totals and prepares chart data
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
      const monthlyTotals = await ctx.db.getYearTotals(
        year,
        currency,
        ctx.ratesUrl
      );

      const data = {
        labels: MONTH_LABELS,
        datasets: [
          {
            label: `Total Costs in ${currency}`,
            data: monthlyTotals,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
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
        position: "top",
      },
      title: {
        display: true,
        text: `Monthly Costs for ${year}`,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.parsed.y || 0;
            return `Total: ${value.toFixed(2)} ${currency}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: `Amount (${currency})`,
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Bar Chart - Yearly Overview
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
        <Box sx={{ mt: 4 }}>
          <Bar data={chartData} options={options} />
        </Box>
      )}
    </Paper>
  );
}

/**
 * MonthlyReportPage.jsx - Page component for viewing monthly cost reports
 * Displays detailed list of costs for a selected month and year in chosen currency
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
} from "@mui/material";
import { SUPPORTED_CURRENCIES } from "../services/CurrencyService.js";

/**
 * Generates array of years from current year back 5 years
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

export default function MonthlyReportPage({ ctx }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [currency, setCurrency] = useState("USD");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Fetches report data for selected month/year/currency
   */
  const handleGetReport = async () => {
    setError("");
    setLoading(true);

    if (!ctx.db) {
      setError("Database is not initialized");
      setLoading(false);
      return;
    }

    try {
      const reportData = await ctx.db.getReport(
        year,
        month,
        currency,
        ctx.ratesUrl
      );
      setReport(reportData);
    } catch (err) {
      setError("Failed to fetch report: " + err.message);
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Monthly Report
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

        <Button
          variant="contained"
          onClick={handleGetReport}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Report"}
        </Button>
      </Box>

      {report && (
        <>
          <Typography variant="h6" gutterBottom>
            Report for {MONTHS.find((m) => m.value === report.month)?.label}{" "}
            {report.year}
          </Typography>

          {report.costs.length === 0 ? (
            <Alert severity="info">No costs found for this period</Alert>
          ) : (
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Original Currency</TableCell>
                      <TableCell align="right">Amount ({currency})</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {report.costs.map((cost, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{cost.Date.day}</TableCell>
                        <TableCell>{cost.category}</TableCell>
                        <TableCell>{cost.description}</TableCell>
                        <TableCell>{cost.currency}</TableCell>
                        <TableCell align="right">
                          {cost.sum.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 3, textAlign: "right" }}>
                <Typography variant="h6">
                  Total: {report.total.total.toFixed(2)} {report.total.currency}
                </Typography>
              </Box>
            </>
          )}
        </>
      )}
    </Paper>
  );
}

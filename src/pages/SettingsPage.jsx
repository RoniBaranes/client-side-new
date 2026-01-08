/**
 * SettingsPage.jsx - Page component for application settings
 * Allows users to configure custom URL for fetching exchange rates
 */

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

export default function SettingsPage({ ctx }) {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUrl = localStorage.getItem("ratesUrl") || "";
    setUrl(savedUrl);
  }, []);

  /**
   * Saves the custom exchange rates URL to localStorage
   */
  const handleSave = () => {
    setMessage("");
    setError("");

    try {
      localStorage.setItem("ratesUrl", url.trim());
      ctx.setRatesUrl(url.trim());
      setMessage("Settings saved successfully");
    } catch (err) {
      setError("Failed to save settings: " + err.message);
    }
  };

  /**
   * Resets to default exchange rates URL
   */
  const handleReset = () => {
    setMessage("");
    setError("");
    setUrl("");
    localStorage.removeItem("ratesUrl");
    ctx.setRatesUrl("");
    setMessage("Settings reset to default");
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Configure custom URL for fetching currency exchange rates. The URL
        should return a JSON object in the format:{" "}
        <code>{"{"}"USD":1, "GBP":0.6, "EURO":0.7, "ILS":3.4{"}"}</code>
      </Typography>

      {message && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setMessage("")}>
          {message}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Exchange Rates URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/rates.json"
          helperText="Leave empty to use default rates"
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Settings
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            Reset to Default
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cost Manager - Final Project in Front-End Development
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Supported currencies: USD, ILS, GBP, EURO
        </Typography>
      </Box>
    </Paper>
  );
}

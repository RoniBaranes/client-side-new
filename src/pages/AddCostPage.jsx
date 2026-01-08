/**
 * AddCostPage.jsx - Page component for adding new cost items
 * Allows users to input cost details: sum, currency, category, and description
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
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { SUPPORTED_CURRENCIES } from "../services/CurrencyService.js";

/**
 * Common expense categories
 */
const CATEGORIES = [
  "FOOD",
  "TRANSPORTATION",
  "EDUCATION",
  "HEALTHCARE",
  "ENTERTAINMENT",
  "UTILITIES",
  "HOUSING",
  "SHOPPING",
  "TRAVEL",
  "CAR",
  "OTHER",
];

export default function AddCostPage({ ctx }) {
  const [sum, setSum] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("FOOD");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /**
   * Handles form submission to add a new cost
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!sum || Number(sum) <= 0) {
      setError("Please enter a valid positive amount");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description");
      return;
    }

    if (!ctx.db) {
      setError("Database is not initialized");
      return;
    }

    try {
      const cost = {
        sum: Number(sum),
        currency,
        category,
        description: description.trim(),
      };

      await ctx.db.addCost(cost);
      setMessage(`Cost added successfully: ${sum} ${currency} for ${category}`);

      // Reset form
      setSum("");
      setDescription("");
    } catch (err) {
      setError("Failed to add cost: " + err.message);
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add New Cost
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

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Amount"
          type="number"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          required
          inputProps={{ min: 0, step: 0.01 }}
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
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

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Cost
        </Button>
      </Box>
    </Paper>
  );
}

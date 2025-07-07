import React, { useState } from "react";
import { Card, TextField, Button, Stack, Typography } from "@mui/material";
import {
  validateUrl,
  validateShortcode,
  validateExpiry,
} from "../utils/validation";
import { shortenUrl } from "../utils/api";
import ShortenedResult from "./ShortenedResult";
import { saveShortenedUrl } from "../utils/storage";

interface Props {
  index: number;
}

const UrlInputCard: React.FC<Props> = ({ index }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleShorten = async () => {
    setError("");
    if (!validateUrl(longUrl)) {
      setError("Invalid URL format");
      return;
    }
    if (shortcode && !validateShortcode(shortcode)) {
      setError("Shortcode must be alphanumeric and 4-8 characters long");
      return;
    }
    if (expiry && !validateExpiry(expiry)) {
      setError("Expiry must be a valid integer (minutes)");
      return;
    }

    try {
      const response = await shortenUrl(longUrl, shortcode, expiry);
      setResult(response);
      // Save to LocalStorage
      saveShortenedUrl({
        shortUrl: response.shortUrl,
        originalUrl: response.originalUrl,
        createdAt: new Date().toISOString(),
        expiry: response.expiry,
      });
    } catch (e) {
      setError("Failed to shorten URL");
    }
  };

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">URL #{index + 1}</Typography>
        <TextField
          label="Long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          fullWidth
        />
        <TextField
          label="Preferred Shortcode (optional)"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          fullWidth
        />
        <TextField
          label="Validity (minutes, optional)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleShorten}>
          Shorten URL
        </Button>
        {result && <ShortenedResult data={result} />}
      </Stack>
    </Card>
  );
};

export default UrlInputCard;

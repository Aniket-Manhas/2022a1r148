import React from "react";
import { Card, Typography, Stack, Link } from "@mui/material";

interface Props {
  data: {
    shortUrl: string;
    expiry: string;
    originalUrl: string;
  };
}

const ShortenedResult: React.FC<Props> = ({ data }) => {
  return (
    <Card variant="outlined" sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
      <Stack spacing={1}>
        <Typography variant="subtitle1">
          <strong>Original URL:</strong> {data.originalUrl}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Shortened URL:</strong>{" "}
          <Link href={data.shortUrl} target="_blank" rel="noopener noreferrer">
            {data.shortUrl}
          </Link>
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Expires At: {data.expiry}
        </Typography>
      </Stack>
    </Card>
  );
};

export default ShortenedResult;

import React, { useState } from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import UrlInputCard from "../components/UrlInputCard";

const MAX_INPUTS = 5;

const UrlShortenerPage = () => {
  const [inputCount, setInputCount] = useState(1);

  const addInput = () => {
    if (inputCount < MAX_INPUTS) {
      setInputCount((prev) => prev + 1);
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        URL Shortener
      </Typography>

      <Stack spacing={2}>
        {Array.from({ length: inputCount }, (_, i) => (
          <UrlInputCard key={i} index={i} />
        ))}

        {inputCount < MAX_INPUTS && (
          <Button variant="outlined" onClick={addInput}>
            Add More URLs
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default UrlShortenerPage;

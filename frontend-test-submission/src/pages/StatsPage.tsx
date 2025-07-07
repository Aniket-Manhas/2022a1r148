import React from "react";
import { Container, Typography, Stack } from "@mui/material";
import StatsTable from "../components/StatsTable";

const StatsPage = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        URL Shortener Statistics
      </Typography>
      <Stack spacing={2}>
        <StatsTable />
      </Stack>
    </Container>
  );
};

export default StatsPage;

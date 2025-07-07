import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  Box,
  Typography,
  IconButton
} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getShortenedUrls, getClicksForUrl, ShortenedUrl } from "../utils/storage";

const StatsTable: React.FC = () => {
  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);

  useEffect(() => {
    setUrls(getShortenedUrls());
  }, []);

  const handleToggle = (idx: number) => {
    setOpenRows((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Short URL</TableCell>
            <TableCell>Original URL</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Expires At</TableCell>
            <TableCell>Total Clicks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urls.map((row, idx) => {
            const clicks = getClicksForUrl(row.shortUrl);
            return (
              <React.Fragment key={idx}>
                <TableRow>
                  <TableCell>
                    <IconButton size="small" onClick={() => handleToggle(idx)}>
                      {openRows[idx] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <a href={row.shortUrl} target="_blank" rel="noopener noreferrer">
                      {row.shortUrl}
                    </a>
                  </TableCell>
                  <TableCell>{row.originalUrl}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>{row.expiry}</TableCell>
                  <TableCell>{clicks.length}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openRows[idx]} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="subtitle1" gutterBottom>
                          Click Details
                        </Typography>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Timestamp</TableCell>
                              <TableCell>Source</TableCell>
                              <TableCell>Location</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {clicks.map((click, cidx) => (
                              <TableRow key={cidx}>
                                <TableCell>{click.timestamp}</TableCell>
                                <TableCell>{click.source}</TableCell>
                                <TableCell>{click.location}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StatsTable;

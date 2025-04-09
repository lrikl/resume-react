import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Box
} from "@mui/material";
import { Email, Phone, GitHub } from "@mui/icons-material";

export default () => {
  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>

        <Box>
          <Typography variant="h6">  Contact Information: </Typography>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Chip icon={<Phone />} label="+38 (066) 001-25-54" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip icon={<Email />} label="tihomiirov@gmail.com" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Chip icon={<GitHub />} label="GitHub" target="_blank" component="a" href="https://github.com/lrikl" clickable variant="outlined" fullWidth />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
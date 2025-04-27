import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Box
} from "@mui/material";
import { Email, Phone, GitHub, LinkedIn } from "@mui/icons-material";

export default () => {
  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>

        <Box>
          <Typography variant="h6">  Contact Information: </Typography>
          <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid>
              <Chip
                  icon={<Phone />}
                  label="+38 (066) 001-25-54"
                  variant="outlined"
                  component="a"
                  href="tel:+380660012554"
                  clickable
                />
            </Grid>
            <Grid >
              <Chip
                  icon={<Email />}
                  label="tihomiirov@gmail.com"
                  variant="outlined"
                  component="a" 
                  href="mailto:tihomiirov@gmail.com"
                  clickable 
                />
            </Grid>
            <Grid>
              <Chip icon={<GitHub />} 
                  label="GitHub" 
                  target="_blank" 
                  component="a"
                  href="https://github.com/lrikl" 
                  clickable 
                  variant="outlined" />
            </Grid>
              <Chip icon={<LinkedIn />} 
                  label="LinkedIn" 
                  target="_blank" 
                  component="a"
                  href="https://www.linkedin.com/in/yaroslav-tikhomyrov-595446335/" 
                  clickable 
                  variant="outlined" />
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
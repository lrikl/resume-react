import React from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Link,
} from "@mui/material";
import { Email, Phone, GitHub, LinkedIn, Language } from "@mui/icons-material";

export default () => {
return (
    <Container maxWidth="md" sx={{ my: 5 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Grid container spacing={3} alignItems="center">
            <Grid item>
                <Avatar
                    sx={{ width: 100, height: 100, bgcolor: "primary.main", fontSize: 32 }}
                >
                    YT
                </Avatar>
            </Grid>
            <Grid item xs>
                <Typography variant="h4" fontWeight={600} gutterBottom>
                    Yaroslav Tihomyrov
                </Typography>
                <Typography color="text.secondary">
                    Trainee Front-End Developer
                </Typography>
            </Grid>
        </Grid>

        <Box mt={3}>
            <Typography variant="h6">About Me</Typography>
            <Typography variant="body2" sx={{ p: 1 }}>
                Seeking a position as an Trainee or Junior Front-End Developer. I have hands-on experience working as an Markup Developer at Rozetka, an online retailer, as well as non-commercial development experience with JavaScript and React. I am committed to continuous professional growth and in-depth learning of modern web development technologies and tools.
            </Typography>
        </Box>

        <Box mt={3}>
            <Typography variant="h6">Hard Skills</Typography>
            <Grid container spacing={1} sx={{ p: 1 }}>
                {["HTML5", "CSS3", "JavaScript", "React", "Redux", "Git", "Webpack", "SASS/SCSS", "Photoshop", "Figma"].map(skill => (
                    <Grid item key={skill}>
                    <Chip label={skill} color="primary" />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box mt={3}>
            <Typography variant="h6">Soft Skills</Typography>
            <Grid container spacing={1} sx={{ p: 1 }}>
                {["Teamwork", "Communication", "Time management", "Adaptability"].map(skill => (
                    <Grid item key={skill}>
                    <Chip label={skill} variant="outlined" />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box mt={3}>
            <Typography variant="h6">Work Experience</Typography>
            <List sx={{ p: 1 }}>
                <ListItem sx={{ p: 0 }}>
                    <ListItemText
                    primary="Markup Developer at Rozetka, an online marketplace"
                    secondary="Nov 2023 - Present | Created responsive, cross-browser layouts using HTML and CSS based on design mockups."
                    />
                </ListItem>
            </List>
        </Box>

        <Box mt={3}>
            <Typography variant="h6">Education</Typography>
            <List sx={{ p: 1 }}>
                <ListItem sx={{ p: 0 }}>
                    <ListItemText
                    primary="Odessa National University named after I.I. Mechnikov"
                    secondary="Bachelor of Science in Information Technology (September 2015 - June 2019)"
                    />
                </ListItem>
                <ListItem sx={{ p: 0 }}>
                    <ListItemText
                    primary="Hillel IT School"
                    secondary="Front-End Pro — Nov 2024 - Present"
                    />
                </ListItem>
            </List>
        </Box>

        <Box mt={3}>
            <Typography variant="h6">Languages</Typography>
            <Box sx={{ p: 1 }}>
                <Typography variant="body2">Ukrainian - Native</Typography>
                <Typography variant="body2">English – Pre-intermediate</Typography>
            </Box>
        </Box>

        </Paper>
    </Container>
    );
};


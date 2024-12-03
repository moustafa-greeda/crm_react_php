import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Grid
} from "@mui/material";

const Home = () => {
  const users = [
    { name: "Name 1", email: "olivia@untitledui.com" },
    { name: "Name 2", email: "phoenix@untitledui.com" },
    { name: "Name 3", email: "lana@untitledui.com" }
  ];

  const features = [
    { label: "Recording", value: 24 },
    { label: "Comments", value: 11 },
    { label: "Views", value: 52 },
    { label: "Shared", value: 10 },
    { label: "Library", value: 4 }
  ];

  return (
    <Box sx={{ padding: 4, backgroundColor: "#F9FAFC", minHeight: "100vh" }}>
      {/* Header Information */}
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Deal Owner
              </Typography>
              <Typography variant="h6">Sam Altman</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Last Contacted
              </Typography>
              <Typography variant="h6">04/04/2024</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* User Section */}
      <Box sx={{ marginTop: 4, display: "flex", gap: 2 }}>
        <Card sx={{ width: "25%" }}>
          <CardContent>
            <Typography variant="h6">Power User</Typography>
            <Box sx={{ textAlign: "center", marginY: 2 }}>
              <Avatar
                sx={{ bgcolor: "#EDF3FF", color: "#4CAF50", margin: "0 auto" }}
              >
                43.7%
              </Avatar>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                Ayan Escobar
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ayan@score.io
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6">User</Typography>
              <Button variant="contained" color="success">
                Send Email
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>F1</TableCell>
                    <TableCell>F2</TableCell>
                    <TableCell>F3</TableCell>
                    <TableCell>F4</TableCell>
                    <TableCell>F5</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>F1</TableCell>
                      <TableCell>F2</TableCell>
                      <TableCell>F3</TableCell>
                      <TableCell>F4</TableCell>
                      <TableCell>F5</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Features Section */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Top 5 Features
        </Typography>
        <Grid container spacing={2}>
          {features.map((feature, index) => (
            <Grid item xs={6} sm={2.4} key={index}>
              <Card sx={{ textAlign: "center", padding: 2 }}>
                <Typography variant="h6">{feature.value}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {feature.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;

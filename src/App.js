import {Routes, Route, Link} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import ShowDish from "./Pages/ShowDish";
import Homescreen from "./Pages/Homescreen";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Container,
} from "@mui/material";
import React from "react";
import axios from "axios";

function App() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        "https://nadav-api-proj.redglacier-ead585f2.germanywestcentral.azurecontainerapps.io/categories"
      )
      .then(response => {
        setCategories(response.data);
      });
  }, []);

  return (
    <Container>
      <Box>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              Deliveries website for TastyTransport
            </Typography>
            <Button variant="">
              <Link
                style={{textDecoration: "none", color: "white"}}
                to="/dishes"
              >
                Menu
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <br />
      <br />
      <br />
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/dishes" element={<MainPage categories={categories} />} />
        <Route
          path="/dishes/category/:id"
          element={<MainPage categories={categories} />}
        />
        <Route path="/dishes/:id" element={<ShowDish />} />
      </Routes>
    </Container>
  );
}

export default App;

import {
  Card,
  Button,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

function MainPage({categories}) {
  const params = useParams();
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (params.id === undefined) {
      fetchDishes();
    } else {
      filterByCategory(params.id);
    }
  }, [params.id]);

  function fetchDishes() {
    axios
      .get(
        "http://nadav-api-proj.redglacier-ead585f2.germanywestcentral.azurecontainerapps.io/dishes"
      )
      .then(response => {
        setDishes(response.data.sort((a, b) => a.category_id - b.category_id));
      });
  }

  function filterByCategory(category_id) {
    axios
      .get(
        `http://nadav-api-proj.redglacier-ead585f2.germanywestcentral.azurecontainerapps.io/dishes?category_id=${category_id}`
      )
      .then(response => {
        setDishes(response.data);
      });
  }

  return (
    <div style={{display: "flex"}}>
      <div
        style={{
          position: "fixed",
          top: "60px",
          left: "0",
          width: "140px",
          borderRight: "1px solid #000",
          overflowY: "auto",
        }}
      >
        {categories.map((category, index) => (
          <Button
            key={category.id}
            fullWidth
            sx={{
              textAlign: "left",
              borderBottom: "1px solid #000",
              borderTop: index === 0 ? "1px solid #000" : "none",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
            component={Link}
            to={`/dishes/category/${category.id}`}
          >
            <CardMedia
              component="img"
              height="55px"
              width="100%"
              image={category.image}
              alt={category.name}
              style={{objectFit: "cover"}}
            />
            <Typography variant="body2" align="center">
              {category.name}
            </Typography>
          </Button>
        ))}
      </div>
      <div style={{marginLeft: "140px"}}>
        <Grid container spacing={2}>
          {dishes.map(dish => (
            <Grid key={dish.id} item xs={6}>
              <Card>
                <br />
                <Typography
                  variant="body1"
                  style={{textAlign: "center", fontWeight: "bold"}}
                >
                  {dish.name}
                </Typography>
                <br />
                <CardMedia
                  component="img"
                  height="300"
                  width="100%"
                  image={dish.image}
                  alt="the dish image"
                />
                <Typography variant="body1">{dish.description}</Typography>
                <h2>${dish.price}</h2>
                <CardActions>
                  <Button component={Link} to={`/dishes/${dish.id}`}>
                    More info here!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default MainPage;

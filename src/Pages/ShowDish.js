import {CardMedia, Typography, Box} from "@mui/material";
import axios from "axios";
import React from "react";
import {useParams} from "react-router-dom";
import {API_URL} from "../config";

function ShowDish() {
  const {id} = useParams();
  const [singleDish, setSingleDish] = React.useState({});

  React.useEffect(() => {
    getDish(id);
  }, [id]);

  function getDish(id) {
    axios.get(`${API_URL}/dishes/${id}`).then(response => {
      setSingleDish(response.data);
    });
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box maxWidth="400px">
        <CardMedia
          component="img"
          height="300"
          image={singleDish.image}
          alt={singleDish.title}
        />
        <Typography variant="body1">{singleDish.description}</Typography>
        <Typography variant="body1">{singleDish.content}</Typography>
      </Box>
    </Box>
  );
}

export default ShowDish;

import React, { useState, useEffect } from 'react'
import Logo from "./components/logo192.png";
import appStyle from './AppStyle.module.css';
import { Card, Grid } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import BookData from './components/Data.json'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addToCart } from "./slices/cartSlice";
import { useGetAllProductsQuery } from "./slices/productsApi";

export const Books = () => {

  const { items: products, status } = useSelector((state) => state.products);
  const [search, setSearch] = useState('')
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // const { BookData, error, isLoading } = useGetAllProductsQuery();
  // console.log("Api", isLoading);

  const handleAddToCart = (curElem) => {
    dispatch(addToCart(curElem));
    // Navigate("/cart");
  };
  return (
    <>
      <div> <h1>Books</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', backgroundColor: "#f4f4f4" }}>
        <Toolbar>
          <Container>
            <div className={appStyle.search_input}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Book Here"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button className="btn btn-outline-success" type="submit">
                Search
              </Button>

            </div>
          </Container>
        </Toolbar>
      </div>


      <div style={{ padding: 20, display: 'flex', justifyContent: 'space-between', flexWrap: "wrap" }}>

        {BookData.filter((curElem) => { return search.toLowerCase() === '' ? curElem : curElem.title.toLowerCase().includes(search) }).map((curElem) => (
          <div style={{ padding: 20 }} key={curElem.link}>

            <Grid >
              <Grid >
                <Card >
                  <div className={appStyle.container} style={{ borderColor: "black" }}>
                    <Card sx={{ maxWidth: 345 }} style={{ padding: 20, backgroundColor: "#f4f4f4", height: 450, width: 350 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="250"
                          image={curElem.imageLink}
                          alt="img"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {curElem.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <h2>Price: ₹{curElem.pages}</h2>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <div style={{ display: 'block', margin: 'auto', }}>
                          <Button onClick={() => handleAddToCart(curElem)} variant='contained' size="small" color="primary" >
                            Add to Cart
                          </Button>
                        </div>
                      </CardActions>
                    </Card>
                  </div >
                </Card>
              </Grid>
            </Grid>

          </div>

        ))}

      </div>
    </>
  )
}
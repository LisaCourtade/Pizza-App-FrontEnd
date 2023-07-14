import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import "./App.css";
import PizzaSize from "./components/PizzaSize";
import ToppingsList, { Topping, AddedTopping } from "./components/ToppingsList";
import PizzaOrder from "./components/PizzaOrder";
import { Link } from "react-router-dom";

function App() {
  const [allToppings, setAllToppings] = useState<Topping[]>([]);
  const [pizzaSize, setPizzaSize] = useState<string>("medium");
  const [selectedToppings, setSelectedToppings] = useState<AddedTopping[]>([]);
  const [hasTopping, setHasTopping] = useState<boolean>(false);

  async function fetchToppings() {
    const response = await fetch("https://pizzapp-api.onrender.com/api/toppings");
    const data = (await response.json()) as Topping[];
    setAllToppings(data.map(d => ({
      ...d,
      price: Number(d.price),
    })));
  }

  useEffect(() => {
    (async function () {
      await fetchToppings();
    })();
  }, []);

  return (
    <Box>
      <h1>Create your pizza</h1>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "800px",
          margin: "auto",
          marginTop: "24px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <ToppingsList
              allToppings={allToppings}
              selectedToppings={selectedToppings}
              setSelectedToppings={setSelectedToppings}
              setHasTopping={setHasTopping}
            />
          </Grid>
          <Grid item xs={6}>
            <PizzaSize setPizzaSize={setPizzaSize} />
            <Box mt={3} sx={{ height: 50 }}>
              <Link to={"/orders"}>See All Orders</Link>
            </Box>
            <PizzaOrder
              pizzaSize={pizzaSize}
              selectedToppings={selectedToppings}
              hasTopping={hasTopping}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;

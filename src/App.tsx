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
    const response = await fetch("http://localhost:8000/api/toppings");
    const data = (await response.json()) as Topping[];
    setAllToppings(data);
  }

  useEffect(() => {
    (async function () {
      await fetchToppings();
    })();
  }, []);

  return (
    <>
      <h1>Create your pizza</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <ToppingsList
              allToppings={allToppings}
              selectedToppings={selectedToppings}
              setSelectedToppings={setSelectedToppings}
              setHasTopping={setHasTopping}
            />
          </Grid>
          <Grid item xs={4} >
              <PizzaSize setPizzaSize={setPizzaSize} />
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ height: 50 }}>
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
    </>
  );
}

export default App;

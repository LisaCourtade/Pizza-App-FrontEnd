import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { AddedTopping } from "./ToppingsList";
import { Order } from "../routes/orders/Orders";
import { Link } from "react-router-dom";

interface PizzaOrderProps {
  pizzaSize: string;
  selectedToppings: AddedTopping[];
  hasTopping: boolean;
}

interface SizePrice {
  size: string;
  price: number;
}

export default function PizzaOrder({
  pizzaSize,
  selectedToppings,
  hasTopping,
}: PizzaOrderProps) {
  const [sizePrice, setSizePrice] = useState<SizePrice>({
    size: "Choose a pizza size",
    price: 0,
  });
  const [orderCreated, setOrderCreated] = useState<number>();
  const [discountPrice, setDiscountPrice] = useState<number>();
  const [discount, setDiscount] = useState<boolean>();

  const totalPrice = selectedToppings
    .map((topping: AddedTopping) => {
      const { price } = topping;
      return price;
    })
    .reduce((total, price) => {
      return total + price;
    }, sizePrice.price);

  const handleClick = () => {
    const toppings = selectedToppings
      .filter((st) => st.added === true)
      .map((st) => st.id);
    const body = {
      size: pizzaSize,
      toppings: toppings,
    };
    fetch("https://pizzapp-api.onrender.com/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data: Order) => {
        const orderId = data.id;
        setOrderCreated(orderId);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    switch (pizzaSize) {
      case "small":
        setSizePrice({
          size: "Small",
          price: 8,
        });
        break;
      case "medium":
        setSizePrice({
          size: "Medium",
          price: 10,
        });
        break;
      case "large":
        setSizePrice({
          size: "Large",
          price: 12,
        });
        break;
    }
  }, [pizzaSize]);

  useEffect(() => {
    if (selectedToppings.filter((st) => st.added === true).length > 3) {
      setDiscount(true);
      setDiscountPrice(totalPrice - (totalPrice * 10) / 100);
    } else {
      setDiscount(false);
    }
  }, [selectedToppings, totalPrice]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="div">
          Your pizza:
        </Typography>
        <List dense>
          <ListItem key={pizzaSize}>
            <ListItemText primary={`${sizePrice.size} pizza`} />
            <ListItemIcon>{sizePrice.price.toFixed(2)} €</ListItemIcon>
          </ListItem>
          {selectedToppings
            .filter((st) => st.added === true)
            .map((topping) => {
              return (
                <ListItem key={topping.id}>
                  <ListItemText primary={topping.name} />
                  <ListItemIcon>{topping.price.toFixed(2)} €</ListItemIcon>
                </ListItem>
              );
            })}
        </List>
        <ListItem key={"total"}>
          <ListItemText
            primary={discount ? "Original price:" : "Total cost:"}
            secondary={discount && "More than 3 toppings:  -10 % discount"}
          />
          <ListItemIcon>{totalPrice.toFixed(2)} €</ListItemIcon>
        </ListItem>
        {discount && (
          <ListItem key={"discount price"}>
            <ListItemText primary={"Total cost:"} />
            <ListItemIcon>{discountPrice?.toFixed(2)} €</ListItemIcon>
          </ListItem>
        )}
        {orderCreated ? (
          <>
            <p>Order succesfully created</p>
            <Link to={`/orders/${orderCreated}`}>See Order</Link>
          </>
        ) : (
          <Button
            onClick={handleClick}
            variant="contained"
            disabled={!hasTopping}
          >
            Order
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

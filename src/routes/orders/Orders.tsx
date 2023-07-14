import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

export interface Order {
  id: number;
  size: string;
  price: number;
  discount: number;
  discount_price: number;
  toppings: string[];
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function fetchOrders() {
    const response = await fetch("https://pizzapp-api.onrender.com/api/orders");
    const data = (await response.json()) as Order[];
    const ordersArray = Object.values(data);
    setOrders(ordersArray.map((o: Order) => ({
      ...o,
      price: Number(o.price),
      discount: Number(o.discount),
      discount_price: Number(o.discount_price),
    })));
  }

  useEffect(() => {
    (async function () {
      await fetchOrders();
    })();
  }, []);

  return (
    <>
      <Link to={"/"}>Order a pizza</Link>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Previous Orders
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="flex-starts"
        alignItems="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1 }}
      >
        {orders.length > 0 ? (
          orders.map((order) => {
            return (
              <Grid item xs={4} key={order.id}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      sx={{ mt: 2, mb: 1 }}
                      variant="h6"
                      component="div"
                    >
                      Order no {order.id}:
                    </Typography>
                    <List dense>
                      <ListItem key={"pizza size and toppings"}>
                        <ListItemText
                          primary={`1 ${order.size} pizza`}
                          secondary={order.toppings.join(" - ")}
                        />
                      </ListItem>
                      {order.discount ? (
                        <>
                          <ListItem key={"price"}>
                            <ListItemText primary={"Original price:"} />
                            <ListItemIcon>
                              {order.price.toFixed(2)} €
                            </ListItemIcon>
                          </ListItem>
                          <ListItem key={"discount"}>
                            <ListItemText primary={"Discount:"} />
                            <ListItemIcon>-{order.discount} %</ListItemIcon>
                          </ListItem>
                          <ListItem key={"discount price"}>
                            <ListItemText primary={"Discount price:"} />
                            <ListItemIcon>
                              {order.discount_price.toFixed(2)} €
                            </ListItemIcon>
                          </ListItem>
                        </>
                      ) : (
                        <ListItem key={"total"}>
                          <ListItemText primary={"Total cost:"} />
                          <ListItemIcon>
                            {order.price.toFixed(2)} €
                          </ListItemIcon>
                        </ListItem>
                      )}
                    </List>
                    <Link to={`/orders/${order.id}`}>See Order</Link>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <p>No orders yet</p>
        )}
      </Grid>
    </>
  );
}

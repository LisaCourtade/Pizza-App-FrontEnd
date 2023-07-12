import { useState, useEffect } from "react";
import { Order } from "./Orders";
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
import { Link, useParams } from "react-router-dom";

export default function ViewOrder() {
  const [order, setOrder] = useState<Order>();

  async function fetchOrderById(id: string) {
    const response = await fetch(`http://localhost:8000/api/orders/${id}`);
    const data = (await response.json()) as Order;
    const orderArray = Object.values(data) as Order[];
    const order = orderArray[0];
    setOrder(order);
  }
  const params = useParams();
  const { orderId } = params;

  useEffect(() => {
    orderId &&
      (async function () {
        await fetchOrderById(orderId);
      })();
  }, [orderId]);

  return (
    <>
      <Link to={"/orders"}>See All Orders</Link>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1 }}
      >
        {order && (
          <Grid item xs={4}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ mt: 2, mb: 1 }} variant="h6" component="div">
                  Order no {order.id}:
                </Typography>
                <List dense>
                  <ListItem key={"pizza size and toppings"}>
                    <ListItemText
                      primary={`1 ${order.size} pizza`}
                      secondary={order.toppings && order.toppings.join(" - ")}
                    />
                  </ListItem>
                  {order.discount ? (
                    <>
                      <ListItem key={"price"}>
                        <ListItemText primary={"Original price:"} />
                        <ListItemIcon>{order.price.toFixed(2)} €</ListItemIcon>
                      </ListItem>
                      <ListItem key={"discount"}>
                        <ListItemText primary={"Discount:"} />
                        <ListItemIcon>-{order.discount} %</ListItemIcon>
                      </ListItem>
                      <ListItem key={"discount price"}>
                        <ListItemText primary={"Discount price:"} />
                        <ListItemIcon>{order.discount_price.toFixed(2)} €</ListItemIcon>
                      </ListItem>
                    </>
                  ) : (
                    <ListItem key={"total"}>
                      <ListItemText primary={"Total cost:"} />
                      <ListItemIcon>{order.price.toFixed(2)} €</ListItemIcon>
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Link to={"/"}>Order another pizza</Link>
    </>
  );
}

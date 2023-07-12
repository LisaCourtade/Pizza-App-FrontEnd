import { useEffect } from "react";
import {
  Box,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export interface Topping {
  id: number;
  name: string;
  price: number;
}

export interface AddedTopping extends Topping {
  added: boolean;
}

interface ToppingsListProps {
  allToppings: Topping[];
  selectedToppings: AddedTopping[];
  setSelectedToppings: React.Dispatch<React.SetStateAction<AddedTopping[]>>;
  setHasTopping: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ToppingsList({
  allToppings,
  selectedToppings,
  setSelectedToppings,
  setHasTopping,
}: ToppingsListProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const findTopping = allToppings.find(
      (el) => el.name === event.target.value
    );
    if (findTopping) {
      const alreadyAddedTopping = selectedToppings.findIndex(
        (st: AddedTopping) => st.name === findTopping.name
      );
      if (alreadyAddedTopping !== -1) {
        const removed = selectedToppings.filter(
          (st) => st.name !== event.target.value
        );
        setSelectedToppings([...removed]);
      } else {
        const newTopping = {
          ...findTopping,
          added: event.target.checked,
        };
        setSelectedToppings([...selectedToppings, newTopping]);
      }
    }
  };

  useEffect(() => {
    if (selectedToppings.length === 0) {
      setHasTopping(false);
    } else {
      setHasTopping(true);
    }
  }, [selectedToppings]);

  return (
    <Grid item xs={12} md={"auto"}>
      <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
        Add toppings
      </Typography>
      <Box>
        <List dense>
          {allToppings.map((topping: Topping) => {
            return (
              <ListItem key={topping.id}>
                <ListItemText primary={topping.name} />
                <ListItemIcon>
                  <Checkbox
                    onChange={handleChange}
                    value={topping.name}
                    size="small"
                    icon={<AddIcon fontSize="small" />}
                    checkedIcon={<RemoveIcon fontSize="small" />}
                  />
                </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Grid>
  );
}

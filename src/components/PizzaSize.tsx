import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

interface PizzaSizeProps {
  setPizzaSize: React.Dispatch<React.SetStateAction<string>>;
}

export default function PizzaSize({ setPizzaSize }: PizzaSizeProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <FormControl component="fieldset" variant="standard">
        <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
          Select pizza size
        </Typography>
        <RadioGroup
          row
          aria-labelledby="pizza-size-group-label"
          name="pizza-size-group"
          defaultValue="medium"
          onChange={(event) => setPizzaSize(event.target.value)}
        >
          <FormControlLabel
            value="small"
            control={<Radio />}
            label="Small"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="medium"
            control={<Radio />}
            label="Medium"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="large"
            control={<Radio />}
            label="Large"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

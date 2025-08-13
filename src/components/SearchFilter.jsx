import { Paper, Stack, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function SearchFilter({ query, onQuery, brand, brands, onBrand }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
        <TextField
          label="Search by name, brand, or feature"
          fullWidth
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          inputProps={{ "aria-label": "Search products" }}
        />
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel id="brand-label">Brand</InputLabel>
          <Select
            labelId="brand-label"
            value={brand}
            label="Brand"
            onChange={(e) => onBrand(e.target.value)}
          >
            {brands.map(b => (
              <MenuItem key={b} value={b}>{b === "all" ? "All brands" : b}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
}

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Checkbox,
  Button,
  Stack,
  Chip,
} from "@mui/material";

export default function ProductCard({ product, checked, onToggle }) {
  const { name, brand, image, price, features = [] } = product;

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={`${name} image`}
        loading="lazy"
        sx={{ height: 200, objectFit: "cover" }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/600x400?text=Image+Unavailable";
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {brand}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 48, // ~2 lines
          }}
        >
          {name}
        </Typography>
        <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
          ₹{price.toLocaleString("en-IN")}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{ minHeight: 56 }}
        >
          {features.slice(0, 3).map((f, i) => (
            <Chip key={i} size="small" label={f} />
          ))}
        </Stack>
      </CardContent>
      <CardActions
        sx={{ justifyContent: "space-between", px: 2, pb: 2, minHeight: 56 }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Checkbox
            checked={checked}
            onChange={onToggle}
            inputProps={{ "aria-label": `Select ${name} for comparison` }}
          />
          <Typography variant="body2">Add to compare</Typography>
        </Stack>
        <Button
          variant="outlined"
          size="small"
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onToggle();
          }}
        >
          {checked ? "Remove" : "Compare"}
        </Button>
      </CardActions>
    </Card>
  );
}

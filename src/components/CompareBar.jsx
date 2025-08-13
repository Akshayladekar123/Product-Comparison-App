import {
  Paper, Stack, Avatar, IconButton, Typography, Button, Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CompareBar({ items, onRemove, onClear }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        mt: 4, mb: 2, p: 2,
        position: "sticky", top: 8, zIndex: 1,
        bgcolor: "background.paper"
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
      >
        <Stack direction="row" gap={2} alignItems="center" flexWrap="wrap">
          <Typography variant="subtitle1" fontWeight={700}>
            Comparing {items.length} item{items.length > 1 ? "s" : ""}
          </Typography>
          <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" }}} />
          <Stack direction="row" gap={2} flexWrap="wrap">
            {items.map(p => (
              <Stack key={p.id} direction="row" alignItems="center" gap={1}>
                <Avatar
                  variant="rounded"
                  alt={p.name}
                  src={p.image}
                  sx={{ width: 40, height: 40 }}
                />
                <Typography variant="body2" sx={{ maxWidth: 160 }} noWrap title={p.name}>
                  {p.name}
                </Typography>
                <IconButton
                  size="small"
                  aria-label={`Remove ${p.name} from comparison`}
                  onClick={() => onRemove(p.id)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Stack>
            ))}
          </Stack>
        </Stack>

        <Button variant="text" onClick={onClear}>
          Clear all
        </Button>
      </Stack>
    </Paper>
  );
}

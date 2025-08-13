import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Box
} from "@mui/material";

function getDiffMap(rows, products) {
  const diff = {};
  rows.forEach(r => {
    const values = products.map(p => p[r.key] ?? p.specs?.[r.key]);
    const unique = new Set(values.map(v => JSON.stringify(v)));
    diff[r.key] = unique.size > 1;
  });
  return diff;
}

export default function CompareTable({ products }) {
  const rows = [
    { label: "Brand", key: "brand" },
    { label: "Name", key: "name" },
    { label: "Price (₹)", key: "price", render: v => v?.toLocaleString("en-IN") },
    { label: "Screen", key: "screen" },
    { label: "Battery", key: "battery" },
    { label: "RAM", key: "ram" },
    { label: "Storage", key: "storage" },
    { label: "Weight", key: "weight" },
    { label: "OS", key: "os" },
  ];

  const diffMap = getDiffMap(rows, products);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Comparison
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small" aria-label="comparison table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Attribute</TableCell>
              {products.map(p => (
                <TableCell key={p.id} sx={{ fontWeight: 700 }}>
                  {p.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.key} hover>
                <TableCell sx={{ fontWeight: 600 }}>{r.label}</TableCell>
                {products.map(p => {
                  const raw = p[r.key] ?? p.specs?.[r.key] ?? "-";
                  const value = r.render ? r.render(raw) : raw;
                  return (
                    <TableCell
                      key={p.id}
                      sx={{
                        bgcolor: diffMap[r.key] ? "warning.light" : "transparent",
                        fontWeight: diffMap[r.key] ? 600 : 400
                      }}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Key Features</TableCell>
              {products.map(p => (
                <TableCell key={p.id}>
                  <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                    {(p.features || []).slice(0,3).map((f,i) => <li key={i}>{f}</li>)}
                  </ul>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

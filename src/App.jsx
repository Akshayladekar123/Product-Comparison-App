import { useMemo, useState, useEffect } from "react";
import {
  CssBaseline,
  Container,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Snackbar,
  Alert,
  Badge,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ProductCard from "./components/ProductCard.jsx";
import CompareBar from "./components/CompareBar.jsx";
import CompareTable from "./components/CompareTable.jsx";
import SearchFilter from "./components/SearchFilter.jsx";
import productsData from "./data/products.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const LS_KEY = "compare.selected";

export default function App() {
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  const [allProducts] = useState(productsData);
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("all");
  const [selectedIds, setSelectedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) ?? [];
    } catch {
      return [];
    }
  });
  const [toast, setToast] = useState({
    open: false,
    msg: "",
    severity: "info",
  });

  useEffect(() => localStorage.setItem("theme", mode), [mode]);
  useEffect(
    () => localStorage.setItem(LS_KEY, JSON.stringify(selectedIds)),
    [selectedIds]
  );

  const brands = useMemo(
    () => ["all", ...Array.from(new Set(allProducts.map((p) => p.brand)))],
    [allProducts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allProducts.filter((p) => {
      const matchesQuery =
        !q ||
        [p.name, p.brand, ...(p.features || [])]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesBrand = brand === "all" || p.brand === brand;
      return matchesQuery && matchesBrand;
    });
  }, [allProducts, query, brand]);

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const set = new Set(prev);
      if (set.has(id)) {
        set.delete(id);
        return Array.from(set);
      }
      if (prev.length >= 3) {
        setToast({
          open: true,
          msg: "You can compare up to 3 products.",
          severity: "warning",
        });
        return prev;
      }
      set.add(id);
      return Array.from(set);
    });
  };

  const removeOne = (id) =>
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  const clearAll = () => setSelectedIds([]);

  const selectedProducts = useMemo(
    () =>
      selectedIds
        .map((id) => allProducts.find((p) => p.id === id))
        .filter(Boolean),
    [selectedIds, allProducts]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Product Comparison
          </Typography>
          <Badge
            color="primary"
            badgeContent={selectedIds.length}
            sx={{ mr: 1 }}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <CompareArrowsIcon />
          </Badge>
          <IconButton
            aria-label="toggle color mode"
            onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <SearchFilter
          query={query}
          onQuery={setQuery}
          brand={brand}
          brands={brands}
          onBrand={setBrand}
        />

        <Box component="section" aria-label="Product list" sx={{ mt: 2 }}>
          <Grid
            container
            spacing={5}
            justifyContent="center"
            alignItems="stretch"
          >
            {filtered.map((p) => (
              <Grid item key={p.id} xs="auto">
                {" "}
                <Box sx={{ width: 300, height: "100%" }}>
                  {" "}
                  <ProductCard
                    product={p}
                    checked={selectedIds.includes(p.id)}
                    onToggle={() => toggleSelect(p.id)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {selectedProducts.length >= 2 && (
          <>
            <CompareBar
              items={selectedProducts}
              onRemove={removeOne}
              onClear={clearAll}
            />
            <CompareTable products={selectedProducts} />
          </>
        )}

        <Snackbar
          open={toast.open}
          autoHideDuration={2000}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity={toast.severity} variant="filled">
            {toast.msg}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

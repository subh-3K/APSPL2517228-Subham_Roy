const products = [
  { name: "Smartphone", category: "electronics", price: 29999, rating: 4.5 },
  { name: "Laptop", category: "electronics", price: 59999, rating: 4.7 },
  { name: "T-Shirt", category: "clothing", price: 799, rating: 4.2 },
  { name: "Jeans", category: "clothing", price: 1499, rating: 4.0 },
  { name: "Novel", category: "books", price: 499, rating: 4.8 },
  { name: "Cookbook", category: "books", price: 999, rating: 4.3 },
];
//for display products
function renderProducts(filteredProducts) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  if (filteredProducts.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
    return;
  }

  filteredProducts.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: ₹${p.price}</p>
      <p>Rating: ⭐ ${p.rating}</p>
    `;
    container.appendChild(card);
  });
}

function filterAndSort() {
  const category = document.getElementById("categoryFilter").value;
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;
  const sort = document.getElementById("sortFilter").value;

  let result = products.filter(p =>
    (!category || p.category === category) &&
    p.price >= minPrice &&
    p.price <= maxPrice
  );

  if (sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === "priceAsc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "priceDesc") {
    result.sort((a, b) => b.price - a.price);
  }

  renderProducts(result);
}

document.querySelectorAll("select, input").forEach(el =>
  el.addEventListener("change", filterAndSort)
);

window.onload = filterAndSort;//this means when the window loads, the filterAndSort function will be called to display the initial product list

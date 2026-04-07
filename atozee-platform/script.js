let allProducts = [];
function getProducts() {
  let container = document.getElementById("products");
  container.innerHTML = "<h2>Loading...</h2>";
  fetch("https://dummyjson.com/products")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      allProducts = data.products;
      displayProducts(allProducts);
    })
    .catch(function(err) {
      console.log(err);
      container.innerHTML = "<h2>Failed to load products</h2>";
    });
}
function displayProducts(products) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<h2>No products found</h2>";
    return;
  }
  products.forEach(function(p) {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML =
      "<img src='" + p.thumbnail + "'>" +
      "<h4>" + p.title + "</h4>" +
      "<p>₹ " + p.price + "</p>";

    container.appendChild(card);
  });
}
function searchProduct() {
  let text = document.getElementById("searchInput").value.toLowerCase();

  let filtered = allProducts.filter(function(p) {
    return p.title.toLowerCase().includes(text);
  });

  displayProducts(filtered);
}
function filterCategory(cat) {
  if (cat === "all") {
    displayProducts(allProducts);
    return;
  }

  let filtered = allProducts.filter(function(p) {
    return p.category === cat;
  });

  displayProducts(filtered);
}
window.onload = function () {
  getProducts();

  document
    .getElementById("searchInput")
    .addEventListener("input", searchProduct);
};
function toggleMode() {
  document.body.classList.toggle("dark-mode");

  let btn = document.getElementById("modeBtn");

  if (document.body.classList.contains("dark-mode")) {
    btn.innerText = "Mode☀️";
  } else {
    btn.innerText = "Mode🌙";
  }
}
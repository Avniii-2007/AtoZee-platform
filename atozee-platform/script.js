let allProducts = [];
function getProducts() {
  fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
      allProducts = data.products;
      displayProducts(allProducts);
    })
    .catch(err => {
      console.log(err);
      document.getElementById("products").innerHTML =
        "<h2>Failed to load products</h2>";
    });
}
function displayProducts(products) {
  let container = document.getElementById("products");
  container.innerHTML = "";

  products.map(p => {
    let card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.thumbnail}">
      <h4>${p.title}</h4>
      <p>₹ ${p.price}</p>
    `;

    container.appendChild(card);
  });
}
function searchProduct() {
  let text = document.getElementById("searchInput").value.toLowerCase();

  let filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(text)
  );

  displayProducts(filtered);
}
function filterCategory(cat) {
  let filtered = allProducts.filter(p => p.category === cat);
  displayProducts(filtered);
}
getProducts();
const products = [
    {
      name: 'Sony Playstation 5',
      url: 'images/playstation_5.png',
      type: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung Galaxy',
      url: 'images/samsung_galaxy.png',
      type: 'smartphones',
      price: 399.99,
    },
    {
      name: 'Cannon EOS Camera',
      url: 'images/cannon_eos_camera.png',
      type: 'cameras',
      price: 749.99,
    },
    {
      name: 'Sony A7 Camera',
      url: 'images/sony_a7_camera.png',
      type: 'cameras',
      price: 1999.99,
    },
    {
      name: 'LG TV',
      url: 'images/lg_tv.png',
      type: 'televisions',
      price: 799.99,
    },
    {
      name: 'Nintendo Switch',
      url: 'images/nintendo_switch.png',
      type: 'games',
      price: 299.99,
    },
    {
      name: 'Xbox Series X',
      url: 'images/xbox_series_x.png',
      type: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung TV',
      url: 'images/samsung_tv.png',
      type: 'televisions',
      price: 1099.99,
    },
    {
      name: 'Google Pixel',
      url: 'images/google_pixel.png',
      type: 'smartphones',
      price: 499.99,
    },
    {
      name: 'Sony ZV1F Camera',
      url: 'images/sony_zv1f_camera.png',
      type: 'cameras',
      price: 799.99,
    },
    {
      name: 'Toshiba TV',
      url: 'images/toshiba_tv.png',
      type: 'televisions',
      price: 499.99,
    },
    {
      name: 'iPhone 14',
      url: 'images/iphone_14.png',
      type: 'smartphones',
      price: 999.99,
    },
];

const productsWrapper = document.getElementById("products-wrapper");
const cartButton = document.getElementById("cartButton");
const cartCountDisplay = document.getElementById("cartCount");
const searchInput = document.getElementById('search');

let cartCount = 0;

document.addEventListener("DOMContentLoaded", function() {
    // render all products initially
    renderProducts(products);

    // add event listener to checkboxes
    const checkboxes = document.querySelectorAll(".check");
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            // get checked checkboxes
            const checkedCheckboxes = document.querySelectorAll('.check:checked');

            // get types of checked checkboxes
            const selectedTypes = Array.from(checkedCheckboxes).map(function(checkbox) {
                return checkbox.id;
            });

            let filteredProducts;
            if(selectedTypes.length == 0) {
                filteredProducts = products;
            } else {
                filteredProducts = products.filter(function(product) {
                    return selectedTypes.includes(product.type);
                });
            }
            
            renderProducts(filteredProducts);
        });
    });
});

// function to render all products
function renderProducts(products) {
  productsWrapper.innerHTML = "";

  products.forEach(function (product) {
      const productContainer = document.createElement("div");
      productContainer.classList.add("product", "relative", "group");
      productContainer.style.marginTop = "20px";
      productContainer.style.marginBottom = "20px";

      const image = document.createElement("img");
      image.src = product.url;
      image.alt = product.name;

      const infoContainer = document.createElement("div");
      infoContainer.classList.add("info-container");
      infoContainer.style.display = "flex";
      infoContainer.style.justifyContent = "space-between";
      infoContainer.style.flexGrow = "1";

      const name = document.createElement("p");
      name.textContent = product.name;
      name.style.fontWeight = "bold"
      name.style.width = "60px"
      name.classList.add("name");

      const price = document.createElement("p");
      price.textContent = "$" + product.price.toFixed(2);
      price.classList.add("price");

      const status = document.createElement("button");
      status.textContent = "Add To Cart";
      status.classList.add("absolute", "bottom-0", "left-0", "right-0", "text-center", "py-2", "translate-y-full", "bg-black", "text-white", "opacity-75");

      status.addEventListener("click", addToCart);

      infoContainer.appendChild(name);
      infoContainer.appendChild(price);

      productContainer.appendChild(image);
      productContainer.appendChild(infoContainer);
      productContainer.appendChild(status);

      productsWrapper.appendChild(productContainer);
  });
}

function addToCart(e) {
  const statusEl = e.target;

  if (statusEl.classList.contains('clicked')) {
    statusEl.style.backgroundColor = "black";
    statusEl.classList.remove('clicked');
    cartCount--;
  } else {
    statusEl.style.backgroundColor = "red";
    statusEl.classList.add('clicked');
    cartCount++;
  }
  cartCountDisplay.textContent = cartCount.toString();
}

searchInput.addEventListener("input", function() {
  const searchText = searchInput.value.toLowerCase();
  const filteredProducts = products.filter(function(product) {
      return product.name.toLowerCase().includes(searchText);
  });
  renderProducts(filteredProducts);
});

const addtocart_icons = document.querySelectorAll(".fa-cart-plus");
const cart_list = document.querySelector(".cart-list");
const close_icon = document.querySelector(".fa-xmark");
const cart_icon = document.querySelector(".fa-cart-shopping");
const cart_items = document.getElementById("cart-items");
const total_cost = document.getElementById("total-cost");

const cartItemCount = {
  count: 0,
};

// Xử lý khi nhấp vào biểu tượng "fa-cart-plus"
function toggleCartOn(event) {
  // Thêm lớp "active" để hiển thị giỏ hàng
  cart_list.classList.add("active");

  // Xác định thành phần đã được nhấp vào
  const clickedItem = event.target;

  // Lấy ID của sản phẩm từ thuộc tính "id" của thành phần đã nhấp vào
  const itemId = clickedItem.id;
  console.log("you just clicked the id: ", itemId);

  // Lấy thông tin sản phẩm dựa trên id
  const product = getProductById(itemId);

  // Nếu sản phẩm tồn tại, thêm vào giỏ hàng và tính tổng giá trị
  if (product) {
    addToCartList(product);
    calculateTotalCost();
  }
}

// Xử lý khi nhấp vào biểu tượng "fa-xmark"
function toggleCartOff() {
  // Xóa lớp "active" để ẩn giỏ hàng
  cart_list.classList.remove("active");
}

// Class ProductInformation để lưu trữ thông tin sản phẩm
class ProductInformation {
  constructor(price, name, imgSrc) {
    // Sản_phẩm.price: giá sp
    this.price = price;
    // Sản_phẩm.name = tên sp
    this.name = name;
    // Sản_phẩm.imgSrc = nguồn ảnh của sp
    this.imgSrc = imgSrc;
  }
}

// Lấy thông tin sản phẩm dựa trên id
function getProductById(itemId) {
  // Kiểm tra id để trả về thông tin sản phẩm tương ứng
  if (itemId === "covua") {
    return new ProductInformation("199.000đ", "Cờ Vua", "/img/covua.jpg");
  }
  if (itemId === "balo1") {
    return new ProductInformation("299.000đ", "Balo 1", "/img/balo1.jpg");
  }
  if (itemId === "lego1") {
    return new ProductInformation("389.000đ", "Lego 1", "/img/lego1_resized.jpg");
  }
  if (itemId === "lego2") {
    return new ProductInformation("1399.000đ", "Lego 2", "/img/lego2-resized.jpg")
  }
  if (itemId === "balo2") {
    return new ProductInformation("269.000đ", "Balo 2", "/img/balo2_resized.jpg")
  }

  return null;
}

// Thêm sản phẩm vào danh sách giỏ hàng
function addToCartList(product) {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
    const existingItem = document.querySelector(`.cart-item[data-name="${product.name}"]`);

    if (existingItem) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
      const countElement = existingItem.querySelector(".cart-item-count");
      const count = parseInt(countElement.textContent);
      countElement.textContent = count + 1;
    } else {
      // Nếu sản phẩm chưa tồn tại, tạo một phần tử trong giỏ hàng
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.setAttribute("data-name", product.name);

        // Tạo phần tử hình ảnh sản phẩm
        const imgElement = document.createElement("img");
        imgElement.src = product.imgSrc;
        imgElement.classList.add("cart-item-image");
        imgElement.style.width = "200px";
        imgElement.style.height = "200px";

       // Tạo phần tử tiêu đề sản phẩm
        const titleElement = document.createElement("h3");
        titleElement.textContent = product.name;
        titleElement.classList.add("cart-item-title");

        // Tạo phần tử giá sản phẩm
        const priceElement = document.createElement("span");
        priceElement.textContent = `${product.price}`;
        priceElement.classList.add("cart-item-price");

        // Tạo phần tử chứa số lượng sản phẩm và nút giảm
        const countContainer = document.createElement("div");
        countContainer.classList.add("cart-item-count-container");

        const minusElement = document.createElement("h2");
        minusElement.textContent = "-";
        minusElement.classList.add("cart-item-minus");
        minusElement.addEventListener("click", decrementCount);

        const countElement = document.createElement("span");
        countElement.textContent = 1;
        countElement.classList.add("cart-item-count");

        // Gắn các phần tử vào phần tử giỏ hàng
        cartItem.appendChild(imgElement);
        cartItem.appendChild(titleElement);
        cartItem.appendChild(priceElement);
        countContainer.appendChild(minusElement);
       countContainer.appendChild(countElement);
        cartItem.appendChild(countContainer);

        // Gắn phần tử giỏ hàng vào danh sách giỏ hàng
        cart_items.appendChild(cartItem);
  
}

    // Tăng số lượng sản phẩm trong giỏ hàng (số lượng += 1)
    cartItemCount.count++;

}

// Function giảm số lượng sản phẩm trong giỏ hàng
function decrementCount(event) {
    const minusElement = event.target;
    const countElement = minusElement.nextSibling;
    let count = parseInt(countElement.textContent);
    if (count > 0) {
       count--;
        countElement.textContent = count;
    if (count === 0) {
      // Nếu số lượng sản phẩm bằng 0, xóa sản phẩm khỏi giỏ hàng
        const cartItem = minusElement.closest(".cart-item");
        cartItem.remove();
    }
    // Tính tổng giá trị
    calculateTotalCost();
    }
}

// Tính tổng giá trị của giỏ hàng
function calculateTotalCost() {
    let total = 0;

// Lựa chọn tất cả các phần tử có class "cart-item" trong giỏ hàng
    const cartItems = cart_items.getElementsByClassName("cart-item");

// Tính giá trị giỏ hàng bằng for loop
    for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const priceElement = item.getElementsByClassName("cart-item-price")[0];
        const countElement = item.getElementsByClassName("cart-item-count")[0];
        const price = parseInt(priceElement.textContent.replace("đ", "").replace(/,/g, ""));
        const count = parseInt(countElement.textContent);
        total += price * count * 1000;
  }

    // Hiển thị tổng giá trị
    total_cost.textContent = `${total.toLocaleString()}đ`;
}

addtocart_icons.forEach((icon) => {
    icon.addEventListener("click", toggleCartOn);
});

cart_icon.addEventListener("click", toggleCartOn);

close_icon.addEventListener("click", toggleCartOff);
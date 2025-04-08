const apiUrl = "https://67ebabc1aa794fb3222b233e.mockapi.io/shoe/products";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const productContainer = document.getElementById("product-container");

    let productHTML = "";

    data.forEach((product) => {
      // Tạo HTML cho mỗi sản phẩm
      productHTML += `
        <div class="p-4 rounded-lg shadow-lg w-64 mb-6 flex flex-col items-center cursor-pointer" onclick="showProductDetail(${product.id})">
            <img src="${product.image}" class="w-full h-48 object-cover mb-4" />
            <h3 class="text-lg font-semibold text-gray-700 mb-2 text-center">${product.name}</h3>
            <h3 class="text-lg font-semibold text-gray-700 mb-2 text-center">${product.description}</h3>
            <p class="text-green-500 font-bold text-center">${product.price} VNĐ</p>
        </div>
      `;
    });

    // Đưa toàn bộ HTML vào container
    productContainer.innerHTML = productHTML;
  })
  .catch((error) => {
    console.error("Có lỗi khi gọi API:", error);
  });

// Hàm hiển thị chi tiết sản phẩm trong modal
function showProductDetail(productId) {
  const apiUrl = `https://67ebabc1aa794fb3222b233e.mockapi.io/shoe/products/${productId}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((product) => {
      const modalContent = document.getElementById("modalContent");

      const modalHTML = `
        <img src="${product.image}" class="w-full h-64 object-cover mb-4" />
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">${product.name}</h2>
        <p class="text-gray-600 mb-4">${product.description}</p>
        <p class="text-green-500 text-xl font-bold">${product.price} VNĐ</p>
      `;
      modalContent.innerHTML = modalHTML;

      document.getElementById("productModal").classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Có lỗi khi lấy chi tiết sản phẩm:", error);
    });
}

// Hàm đóng modal khi nhấn nút đóng (X)
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("productModal").classList.add("hidden");
});

// Hàm đóng modal khi nhấn nút "Đóng"
document.getElementById("closeModalButton").addEventListener("click", () => {
  document.getElementById("productModal").classList.add("hidden");
});

let currentEditingProduct = null; // Biến để lưu trữ sản phẩm đang chỉnh sửa

// Lắng nghe sự kiện click vào nút Thêm sản phẩm
document.getElementById("addProductButton").addEventListener("click", () => {
  document.getElementById("productModal").classList.remove("hidden");
  document.getElementById("submitProductButton").textContent = "Thêm sản phẩm";
  document.getElementById("productForm").reset();
  currentEditingProduct = null; // Reset sản phẩm đang chỉnh sửa
  document.getElementById("modalTitle").textContent = "Thêm sản phẩm";
});

// Hàm đóng modal
function closeModal() {
  document.getElementById("productModal").classList.add("hidden");
  document.getElementById("productForm").reset(); // Reset form sau khi đóng
  document.getElementById("submitProductButton").textContent = "Thêm sản phẩm";
  document.getElementById("modalTitle").textContent = "Thêm sản phẩm";
}

// Lắng nghe sự kiện submit của form (thêm hoặc chỉnh sửa sản phẩm)
document
  .getElementById("productForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Ngừng hành động mặc định của form

    const formData = new FormData(document.getElementById("productForm"));
    const productData = {
      image: formData.get("product-image"),
      name: formData.get("product-name"),
      description: formData.get("product-description"),
      price: formData.get("product-price"),
    };

    // Kiểm tra tính hợp lệ của dữ liệu
    if (
      !productData.image ||
      !productData.name ||
      !productData.description ||
      !productData.price
    ) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    if (currentEditingProduct) {
      // Cập nhật sản phẩm
      await updateProduct(currentEditingProduct.id, productData);
    } else {
      // Thêm sản phẩm mới
      await addProduct(productData);
    }
  });

// Hàm thêm sản phẩm
async function addProduct(productData) {
  try {
    const response = await fetch(
      "https://67ebabc1aa794fb3222b233e.mockapi.io/shoe/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );

    if (response.ok) {
      alert("Sản phẩm đã được thêm thành công!");
      closeModal(); // Đóng modal sau khi thêm sản phẩm
      fetchProducts(); // Tải lại danh sách sản phẩm
    } else {
      alert("Đã có lỗi khi thêm sản phẩm.");
    }
  } catch (error) {
    alert("Có lỗi xảy ra. Vui lòng thử lại!");
    console.error(error);
  }
}

// Hàm cập nhật sản phẩm
async function updateProduct(productId, updatedData) {
  try {
    const response = await fetch(
      `https://67ebabc1aa794fb3222b233e.mockapi.io/shoe/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.ok) {
      alert("Sản phẩm đã được cập nhật!");
      closeModal(); // Đóng modal sau khi cập nhật sản phẩm
      fetchProducts(); // Tải lại danh sách sản phẩm
    } else {
      alert("Đã có lỗi khi cập nhật sản phẩm.");
    }
  } catch (error) {
    alert("Có lỗi xảy ra. Vui lòng thử lại!");
    console.error(error);
  }
}

// Hàm xóa sản phẩm
async function deleteProduct(productId) {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    try {
      const response = await fetch(
        `https://67ebabc1aa794fb3222b233e.mockapi.io/shoe/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Sản phẩm đã được xóa!");
        fetchProducts(); // Tải lại danh sách sản phẩm
      } else {
        alert("Đã có lỗi khi xóa sản phẩm.");
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error(error);
    }
  }
}

// Hàm để lấy và hiển thị tất cả sản phẩm
async function fetchProducts() {
  const productContainer = document.getElementById("product-container");
  try {
    const response = await fetch(
      "https://67ebabc1aa794fb3222b233e.mockapi.io/shoe/products"
    );
    const products = await response.json();

    // Clear container before displaying new products
    productContainer.innerHTML = "";

    // Duyệt qua dữ liệu và hiển thị mỗi sản phẩm
    products.forEach((product) => {
      displayProduct(product);
    });
  } catch (error) {
    console.error("Có lỗi khi lấy sản phẩm:", error);
  }
}

function displayProduct(product) {
  const productContainer = document.getElementById("product-container");

  const productRow = document.createElement("tr");

  const productImageCell = document.createElement("td");
  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.alt = product.name;
  productImage.classList.add("w-16", "h-16", "object-cover");
  productImageCell.classList.add("flex", "justify-center", "items-center");
  productImageCell.appendChild(productImage);

  const productNameCell = document.createElement("td");
  productNameCell.textContent = product.name;
  productNameCell.classList.add("text-center");

  const productDescriptionCell = document.createElement("td");
  productDescriptionCell.textContent = product.description;
  productDescriptionCell.classList.add("text-center");

  const productPriceCell = document.createElement("td");
  productPriceCell.textContent = `${product.price} VNĐ`;
  productPriceCell.classList.add("text-center");

  // Tạo cột hành động và căn giữa các nút theo hàng ngang
  const actionCell = document.createElement("td");
  actionCell.classList.add(
    "justify-center", // Căn giữa các nút theo chiều ngang
    "items-center", // Căn giữa các nút theo chiều dọc
    "space-x-20" // Khoảng cách giữa các nút
  );

  // Tạo nút chỉnh sửa
  const editButton = document.createElement("button");
  editButton.textContent = "Chỉnh sửa";
  editButton.classList.add(
    "bg-blue-500",
    "text-white",
    "py-2",
    "px-4",
    "rounded-lg",
    "hover:bg-blue-700",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-300",
    "ml-40"
  );
  editButton.onclick = () => {
    currentEditingProduct = product; // Lưu thông tin sản phẩm đang chỉnh sửa
    document.getElementById("productModal").classList.remove("hidden");

    // Điền dữ liệu vào form
    document.getElementById("product-image").value = product.image;
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-description").value = product.description;
    document.getElementById("product-price").value = product.price;

    // Hiển thị nút "Cập nhật sản phẩm"
    document.getElementById("submitProductButton").textContent =
      "Cập nhật sản phẩm";
    document.getElementById("modalTitle").textContent = "Chỉnh sửa sản phẩm";
  };

  // Tạo nút xóa
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Xóa";
  deleteButton.classList.add(
    "bg-red-500",
    "text-white",
    "py-2",
    "px-2",
    "rounded-lg",
    "hover:bg-red-700",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-red-300"
  );
  deleteButton.onclick = () => {
    deleteProduct(product.id); // Xóa sản phẩm khi nhấn nút xóa
  };

  // Thêm các nút vào cột hành động
  actionCell.appendChild(editButton);
  actionCell.appendChild(deleteButton);

  // Thêm các ô vào dòng
  productRow.appendChild(productImageCell);
  productRow.appendChild(productNameCell);
  productRow.appendChild(productDescriptionCell);
  productRow.appendChild(productPriceCell);
  productRow.appendChild(actionCell); // Thêm cột hành động vào dòng

  // Thêm dòng vào bảng
  productContainer.appendChild(productRow);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

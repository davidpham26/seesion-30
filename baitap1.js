let products = [
  {
      id: 1,
      name: "mèn mén",
      price: 20000,
      quantity: 20,
      category: "món ăn dân tộc Mông",
  },
  {
      id: 2,
      name: "mứt",
      price: 80000,
      quantity: 21,
      category: "món ăn dân tộc Kinh",
  },
  {
      id: 3,
      name: "cơm lam",
      price: 40000,
      quantity: 15,
      category: "món ăn dân tộc Mông",
  },
  {
      id: 4,
      name: "bánh đậu xanh",
      price: 60000,
      quantity: 30,
      category: "món ăn dân tộc Kinh",
  },
];

let cart = [];
let menu = `
1. Hiển thị sản phẩm theo danh mục.
2. Mua sản phẩm
3. Sắp xếp các sản phẩm trong cửa hàng theo giá:
4. Tính số tiền thanh toán trong giỏ hàng.
5. Thoát.
Mời bạn nhập lựa chọn của mình:
`;

let loop = true;

while (loop) {
  let choice = +prompt(menu);
  switch (choice) {
      case 1:
          let categories = [...new Set(products.map(product => product.category))];
          console.log("Các danh mục sản phẩm:");
          categories.forEach((category, index) => console.log(`${index + 1}. ${category}`));
          
          let categoryChoice = prompt("Chọn danh mục muốn xem (Nhập tên danh mục): ");
          let filteredProducts = products.filter(product => product.category === categoryChoice);
          
          if (filteredProducts.length === 0) {
              console.log("Không có sản phẩm trong danh mục này.");
          } else {
              console.log(`Sản phẩm trong danh mục "${categoryChoice}":`);
              filteredProducts.forEach(product => {
                  console.log(`ID: ${product.id}, Tên: ${product.name}, Giá: ${product.price}, Số lượng: ${product.quantity}`);
              });
          }
          break;

      case 2:
          let productId = parseInt(prompt("Nhập ID sản phẩm muốn mua: "));
          let product = products.find(p => p.id === productId);
          
          if (product) {
              let quantity = parseInt(prompt(`Nhập số lượng ${product.name} muốn mua: `));
              
              if (product.quantity >= quantity) {
                  product.quantity -= quantity; 
                  let cartItem = cart.find(item => item.id === product.id);
                  
                  if (cartItem) {
                      cartItem.quantity += quantity;
                  } else {
                      cart.push({ id: product.id, name: product.name, price: product.price, quantity: quantity });
                  }

                  console.log(`Đã thêm ${quantity} ${product.name} vào giỏ hàng.`);
              } else {
                  console.log("Không đủ số lượng sản phẩm trong kho.");
              }
          } else {
              console.log("Sản phẩm không tồn tại.");
          }
          break;

      case 3:
          let sortOrder = prompt("Chọn sắp xếp theo giá (tăng dần/giảm dần): ");
          if (sortOrder === "tăng dần") {
              products.sort((a, b) => a.price - b.price);
          } else if (sortOrder === "giảm dần") {
              products.sort((a, b) => b.price - a.price);
          } else {
              console.log("Lựa chọn không hợp lệ.");
          }
          console.log("Danh sách sản phẩm sau khi sắp xếp theo giá:");
          products.forEach(product => {
              console.log(`Tên: ${product.name}, Giá: ${product.price}, Số lượng: ${product.quantity}`);
          });
          break;

      case 4:
          let total = 0;
          cart.forEach(item => {
              total += item.price * item.quantity;
          });
          console.log(`Tổng tiền thanh toán trong giỏ hàng: ${total} VNĐ.`);
          break;

      case 5:
          console.log("Hẹn gặp lại !!!");
          loop = false;
          break;

      default:
          console.log("Lựa chọn không hợp lệ.");
          break;
  }
}
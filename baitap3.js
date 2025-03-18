let phones = [];
let cart = [];
let choice;
let menu = `
1. Hiển thị danh sách điện thoại theo hãng (Người dùng chọn hãng để xem điện thoại trong danh mục đó).
2. Thêm điện thoại mới vào kho.
3. Tìm kiếm điện thoại theo tên hoặc id.
4. Mua điện thoại (Nhập id điện thoại cần mua và số lượng, cập nhật lại kho).
5. Sắp xếp điện thoại theo giá:
6. Tính tổng số lượng điện thoại đã mua và in ra tổng tiền trong giỏ hàng.
7. Hiển thị tổng số lượng điện thoại trong kho.
8. Thoát chương trình.
==========================
Moi nhap lua chon: `;

while (choice !== 8) {
  choice = +prompt(menu);
  switch (choice) {
    case 1:
      displayPhone(phones);
      break;
    case 2:
      addPhone();
      break;
    case 3:
      findPhone();
      break;
    case 4:
      buyProduct(phones);
      break;
    case 5:
      sortPhones();
      break;
    case 6:
      calTotal();
      break;
    case 7:
      displayPhonesInStock();
      break;
    case 8:
      alert(`Da thoat chuong trinh!`);
      break;
    default:
      alert("Lua chon khong hop le!");
  }
}

function displayPhone(phones) {
  if (phones.length === 0) {
    alert("Danh sach dien thoai rong");
    return;
  }
  console.log(`===Danh sach Dien Thoai Hien Tai:===`);
  phones.forEach(function (phone) {
    console.table(phone);
    console.log(`==================================================`);
  });
}

function addPhone() {
  let id = Math.floor(Math.random() * 1000) + 1;
  let name = prompt("Nhap ten dien thoai:");
  let price = +prompt("Nhap gia dien thoai:");
  let quantity = +prompt("Nhap so luong san pham");
  let company = prompt("Nhap hang dien thoai:");
  phones.push({ id, name, price, quantity, company });
  alert(`Da them dien thoai moi vao kho`);
}

function findPhone() {
  let choice;
  let findIndex = -1;
  let n = +prompt(`
        1. Tim theo Ten dien thoai
        2. Tim theo ID dien thoai`);
  switch (n) {
    case 1:
      choice = prompt(`Moi nhap Ten dien thoai muon mua`);
      findIndex = -1;
      findIndex = phones.findIndex((phone) => phone.name === choice);
      if (findIndex === -1) {
        alert(`Khong co dien thoai nay`);
      } else {
        console.table(phones[findIndex]);
        alert(`Da tim thay dien thoai muon mua`);
      }
      break;
    case 2:
      choice = +prompt(`Moi nhap ID dien thoai muon mua`);
      findIndex = -1;
      findIndex = phones.findIndex((phone) => phone.id === choice);
      if (findIndex === -1) {
        alert(`Khong co dien thoai nay`);
      } else {
        console.table(phones[findIndex]);
        alert(`Da tim thay dien thoai muon mua`);
      }
      break;
    default:
      alert(`Lua chon khong hop le!`);
  }
}

function sortPhones() {
  let subMenu = `
    a. Tăng dần.
    b. Giảm dần.`;
  let subChoice = prompt(subMenu);
  switch (subChoice) {
    case 'a':
      phones.sort((a, b) => a.price - b.price);
      alert(`Sap xep thanh cong!`);
      break;
    case 'b':
      phones.sort((a, b) => b.price - a.price);
      alert(`Sap xep thanh cong!`);
      break;
    default:
      alert("Lua chon khong hop le!");
  }
}

function buyProduct(products) {
  let choice = +prompt(`Moi nhap ID dien thoai muon mua`);
  let findIndex = -1;
  findIndex = products.findIndex((product) => product.id === choice);
  if (findIndex === -1) {
    alert(`Khong co dien thoai nay trong cua hang`);
  } else {
    let amount = +prompt(`Moi nhap so luong muon mua: `);
    if (products[findIndex].quantity < amount) {
      alert(`So luong hang khong du`);
    } else {
      products[findIndex].quantity -= amount;
      let check = -1;
      check = cart.findIndex((product) => product.id === products[findIndex].id);
      if (check === -1) {
        cart.push({ ...products[findIndex] });
        cart[cart.length - 1].quantity = amount;
      } else {
        cart[check].quantity += amount;
      }
      alert(`Mua thanh cong!`);
    }
  }
}

function calTotal() {
  let total = 0;
  cart.forEach((product) => {
    total += +product.price * +product.quantity;
  });
  let amount = 0;
  cart.forEach((product) => {
    amount += product.quantity;
  });
  alert(`Tong so luong san pham trong gio hang: ${amount}
        So tien can thanh toan: ${total}`);
}

function displayPhonesInStock() {
  let amount = 0;
  phones.forEach((product) => {
    amount += product.quantity;
  });
  alert(`Tong so luong dien thoai trong kho: ${amount}`);
}
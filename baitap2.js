let books = [];
let cart = []
let choice;
let menu = `
1. Hiển thị danh sách sách theo thể loại (Người dùng chọn thể loại để xem sách trong danh mục đó).
2. Thêm sách mới vào kho
3. Tìm kiếm sách theo tên hoặc id.
4. Mua sách (Nhập id sách cần mua và số lượng, cập nhật lại kho).
5. Sắp xếp sách theo giá:
6. Tính tổng số lượng sách đã mua và in ra tổng tiền trong giỏ hàng
7. Hiển thị tổng số lượng sách trong kho.
8. Thoát chương trình.
==========================
Moi nhap lua chon: `;
while (choice !== 8) {
  choice = +prompt(menu);
  switch (choice) {
    case 1:
      displayBook(books);
      break;
    case 2:
      addBook();
      break;
    case 3:
      findBook();
      break;
    case 4:
        buyProduct(books)
      break;
    case 5:
        sortBooks()
      break;
    case 6:
        calTotal()
      break;
    case 7:
        displayBooksInStock()
      break;
    case 8:
      alert(`Da thoat chuong trinh!`);
      break;
    default:
      alert("Lua chon khong hop le!");
  }
}
function displayBook(books) {
   if(books.length ===0){
    alert("Danh sach sach rong");
    return;
  }
  console.log(`===Danh sach Sach Hien Tai:===`)
  books.forEach(function(book){
    console.table(book)
    console.log(`==================================================`)
  })
    
  }

function addBook() {
  let id = Math.floor(Math.random() * 1000) + 1;
  let name = prompt("Nhap ten sach:");
  let price = +prompt("Nhap gia sach:");
  let quantity = +prompt("Nhap so luong san pham");
  let category = prompt("Nhap loai sach:");
  books.push({ id, name, price, quantity, category });
  alert(`Da them sach moi vao kho`);
}
function findBook() {
    let choice
    let findIndex = -1;
  let n = +prompt(`
        1. Tim theo Ten sach
        2. Tim theo ID sach`);
  switch (n) {
    case 1:
       choice = prompt(`Moi nhap Ten sach muon mua`);
       findIndex = -1;
      findIndex = books.findIndex((book) => book.name === choice);
      if (findIndex === -1) {
        alert(`Khong co sach nay`);
      } else {
        console.table(books[findIndex]);
        alert(`Da tim thay sach muon mua`);
      }
      break;
    case 2:
       choice = +prompt(`Moi nhap ID sach muon mua`);
       findIndex = -1;
      findIndex = books.findIndex((book) => book.id === choice);
      if (findIndex === -1) {
        alert(`Khong co sach nay`);
      } else {
        console.table(books[findIndex]);
        alert(`Da tim thay sach muon mua`);
      }
      break;
    default:
      alert(`Lua chon khong hop le!`);
  }
}
function sortBooks(){
    let subMenu = `
    a. Tăng dần.
    b. Giảm dần.`
    let subChoice = prompt(subMenu)
    switch(subChoice){
        case 'a':
           books.sort((a, b) => a.price - b.price)
           alert(`Sap xep thanh cong!`)
            break
        case 'b':
            books.sort((a, b) => b.price - a.price)
            alert(`Sap xep thanh cong!`)
            break
        default:
            alert("Lua chon khong hop le!");
    }
}
function buyProduct(products){
    let choice = +prompt(`Moi nhap ID sach muon mua`)
    let findIndex = -1
    findIndex = products.findIndex(product=>product.id===choice)
    if(findIndex === -1){
       alert(`Khong co sach nay trong cua hang`)
    }else{
       let amount = +prompt(`Moi nhap so luong muon mua: `)
       if(products[findIndex].quantity < amount ){
           alert(`So luong hang khong du`)
       }else{
       products[findIndex].quantity -= amount
       let check = -1
        check = cart.findIndex(product => product.id === products[findIndex].id)
        if(check === -1){
       cart.push({ ...products[findIndex] })
          cart[cart.length - 1].quantity = amount
        }else{
           cart[check].quantity += amount
        }
         alert(`Mua thanh cong!`)  
       }
    }
   }
function calTotal(){
    let total = 0;
    cart.forEach(product => {
      total += +product.price * +product.quantity
    })
    let amount = 0
    cart.forEach(product => {
        amount += product.quantity
      })
      
      alert(`Tong so luong san pham trong gio hang: ${amount}
        So tien can thanh toan: ${total}`)
    
  }
function displayBooksInStock(){
    let amount = 0
    books.forEach(product => {
        amount += product.quantity
      })
      
      alert(`Tong so luong sach trong kho: ${amount}`)
  }
  
  
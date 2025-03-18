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
    }
];

let cart = []; // Khai báo giỏ hàng

function displayProducts() {
    console.log("---- Danh sách sản phẩm ----");
    products.forEach(product => {
        console.log(`${product.id}. ${product.name} - ${product.price} VND - ${product.quantity} cái - ${product.category}`);
    });
}

function sortProductsByPriceAsc() {
    products.sort((a, b) => a.price - b.price);
    displayProducts();
}

function sortProductsByPriceDesc() {
    products.sort((a, b) => b.price - a.price);
    displayProducts();
}

function calculateTotalPrice() {
    let total = cart.reduce((sum, item) => sum += item.price * item.quantity, 0);
    console.log(`Tổng tiền trong giỏ hàng: ${total} VND`);
}

function buyProduct() {
    let productId = Number(prompt("Nhập ID sản phẩm bạn muốn mua: "));
    let quantity = Number(prompt("Nhập số lượng: "));

    let product = products.find(p => p.id === productId);
    if (product && product.quantity >= quantity) {
        cart.push({ ...product, quantity });
        product.quantity -= quantity;
        console.log("Sản phẩm đã được thêm vào giỏ hàng");
    } else {
        console.log("Sản phẩm không đủ số lượng hoặc không tồn tại");
    }
}

let choice;
do {
    console.log("\n---- Menu ----");
    console.log("1. Hiển thị sản phẩm");
    console.log("2. Mua sản phẩm");
    console.log("3. Sắp xếp sản phẩm theo giá (Tăng dần)");
    console.log("4. Sắp xếp sản phẩm theo giá (Giảm dần)");
    console.log("5. Tính tổng tiền trong giỏ hàng");
    console.log("6. Thoát");

    choice = Number(prompt("Mời bạn nhập lựa chọn: "));

    switch (choice) {
        case 1:
            displayProducts();
            break;
        case 2:
            buyProduct();
            break;
        case 3:
            sortProductsByPriceAsc();
            break;
        case 4:
            sortProductsByPriceDesc();
            break;
        case 5:
            calculateTotalPrice();
            break;
        case 6:
            console.log("Thoát chương trình.");
            break;
        default:
            console.log("Lựa chọn không hợp lệ, vui lòng thử lại.");
    }
} while (choice !== 6);

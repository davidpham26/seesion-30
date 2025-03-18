let store = [];
let cart = [];

function addPhone(id, name, price, quantity, company) {
    const phone = {
        id,
        name,
        price,
        quantity,
        company
    };
    store.push(phone);
    console.log(`Đã thêm điện thoại ${name} vào cửa hàng.`);
}

function displayPhonesByCompany(company) {
    const filteredPhones = store.filter(phone => phone.company === company);
    if (filteredPhones.length === 0) {
        console.log(`Không có điện thoại của hãng ${company} trong cửa hàng.`);
    } else {
        console.log(`Danh sách điện thoại của hãng ${company}:`);
        filteredPhones.forEach(phone => {
            console.log(`ID: ${phone.id}, Tên: ${phone.name}, Giá: ${phone.price}, Số lượng: ${phone.quantity}`);
        });
    }
}

function searchPhone(query) {
    const foundPhones = store.filter(phone => phone.name.toLowerCase().includes(query.toLowerCase()) || phone.id == query);
    if (foundPhones.length === 0) {
        console.log(`Không tìm thấy điện thoại với tên hoặc ID: ${query}`);
    } else {
        console.log(`Kết quả tìm kiếm:`);
        foundPhones.forEach(phone => {
            console.log(`ID: ${phone.id}, Tên: ${phone.name}, Giá: ${phone.price}, Số lượng: ${phone.quantity}`);
        });
    }
}

function buyPhone(id, quantity) {
    const phone = store.find(p => p.id === id);
    if (!phone) {
        console.log("Không tìm thấy điện thoại với ID này.");
        return;
    }

    if (phone.quantity >= quantity) {
        phone.quantity -= quantity;
        const cartItem = { ...phone, quantity };
        cart.push(cartItem);
        console.log(`Đã thêm ${quantity} điện thoại ${phone.name} vào giỏ hàng.`);
    } else {
        console.log(`Không đủ số lượng điện thoại ${phone.name} trong cửa hàng.`);
    }
}

function checkout() {
    if (cart.length === 0) {
        console.log("Giỏ hàng của bạn đang rỗng.");
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    console.log(`Thanh toán thành công! Tổng tiền là: ${total}`);
    cart = [];
}

function sortPhonesByPrice(order) {
    if (order === 'asc') {
        store.sort((a, b) => a.price - b.price);
        console.log("Đã sắp xếp điện thoại theo giá tăng dần.");
    } else if (order === 'desc') {
        store.sort((a, b) => b.price - a.price);
        console.log("Đã sắp xếp điện thoại theo giá giảm dần.");
    } else {
        console.log("Tham số sắp xếp không hợp lệ. Vui lòng chọn 'asc' hoặc 'desc'.");
    }
}

function showTotalValue() {
    const totalValue = store.reduce((sum, phone) => sum + (phone.price * phone.quantity), 0);
    console.log(`Tổng giá trị của tất cả điện thoại trong cửa hàng là: ${totalValue}`);
}

function showTotalQuantityByCompany() {
    const companyQuantity = store.reduce((result, phone) => {
        if (!result[phone.company]) {
            result[phone.company] = 0;
        }
        result[phone.company] += phone.quantity;
        return result;
    }, {});

    console.log("Tổng số lượng điện thoại theo hãng:");
    for (const company in companyQuantity) {
        console.log(`${company}: ${companyQuantity[company]}`);
    }
}

function exit() {
    console.log("Thoát chương trình.");
    process.exit();
}

function showMenu() {
    console.log("\n--- MENU ---");
    console.log("1. Thêm điện thoại mới vào cửa hàng");
    console.log("2. Hiển thị danh sách điện thoại theo hãng");
    console.log("3. Tìm kiếm điện thoại theo tên hoặc ID");
    console.log("4. Mua điện thoại");
    console.log("5. Thanh toán giỏ hàng");
    console.log("6. Sắp xếp điện thoại theo giá");
    console.log("7. Hiển thị tổng giá trị của tất cả điện thoại trong cửa hàng");
    console.log("8. Hiển thị tổng số lượng điện thoại theo từng hãng");
    console.log("9. Thoát");
}

function runProgram() {
    const readlineSync = require('readline-sync');

    do {
        showMenu();
        const choice = readlineSync.question("Chọn một chức năng (1-9): ");

        switch (choice) {
            case '1':
                const id = readlineSync.questionInt("Nhập ID điện thoại: ");
                const name = readlineSync.question("Nhập tên điện thoại: ");
                const price = readlineSync.questionInt("Nhập giá điện thoại: ");
                const quantity = readlineSync.questionInt("Nhập số lượng: ");
                const company = readlineSync.question("Nhập hãng điện thoại: ");
                addPhone(id, name, price, quantity, company);
                break;

            case '2':
                const companyName = readlineSync.question("Nhập tên hãng cần hiển thị: ");
                displayPhonesByCompany(companyName);
                break;

            case '3':
                const searchQuery = readlineSync.question("Nhập tên hoặc ID điện thoại cần tìm: ");
                searchPhone(searchQuery);
                break;

            case '4':
                const buyId = readlineSync.questionInt("Nhập ID điện thoại cần mua: ");
                const buyQuantity = readlineSync.questionInt("Nhập số lượng cần mua: ");
                buyPhone(buyId, buyQuantity);
                break;

            case '5':
                checkout();
                break;

            case '6':
                const sortOrder = readlineSync.question("Chọn thứ tự sắp xếp (asc/desc): ");
                sortPhonesByPrice(sortOrder);
                break;

            case '7':
                showTotalValue();
                break;

            case '8':
                showTotalQuantityByCompany();
                break;

            case '9':
                exit();
                break;

            default:
                console.log("Lựa chọn không hợp lệ. Vui lòng chọn lại.");
        }
    } while (true);
}

runProgram();

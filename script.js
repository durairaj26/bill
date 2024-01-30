let itemList = [];
let totalPrice = 0;

function addItem() {
  const itemName = document.getElementById("item-name").value;
  const itemPrice = parseFloat(document.getElementById("item-price").value);
  const itemQty = parseInt(document.getElementById("item-qty").value);

  if (itemName && !isNaN(itemPrice) && !isNaN(itemQty) && itemQty > 0) {
    const totalItemPrice = itemPrice * itemQty;
    itemList.push({
      name: itemName,
      price: itemPrice,
      qty: itemQty,
      total: totalItemPrice,
    });

    updateItemList();
    updateTotalPrice();

    // Clear input fields
    document.getElementById("item-name").value = "";
    document.getElementById("item-price").value = "";
    document.getElementById("item-qty").value = "";
  } else {
    alert("Please enter valid item details.");
  }
}

function updateItemList() {
  const itemListSection = document.getElementById("item-table-body");
  itemListSection.innerHTML = "";

  itemList.forEach((item, index) => {
    const itemRow = document.createElement("tr");
    itemRow.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.qty}</td>
        <td>
          <button onclick="editItem(${index})">Edit</button>
          <button onclick="deleteItem(${index})">Delete</button>
        </td>
      `;
    itemListSection.appendChild(itemRow);
  });
}

function updateTotalPrice() {
  totalPrice = itemList.reduce((total, item) => total + item.total, 0);
  document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

function deleteItem(index) {
  itemList.splice(index, 1);
  updateItemList();
  updateTotalPrice();
}

function editItem(index) {
  const editModal = document.getElementById("editModal");
  const editItemNameInput = document.getElementById("edit-item-name");
  const editItemPriceInput = document.getElementById("edit-item-price");
  const editItemQtyInput = document.getElementById("edit-item-qty");

  editItemNameInput.value = itemList[index].name;
  editItemPriceInput.value = itemList[index].price;
  editItemQtyInput.value = itemList[index].qty;

  // Open the modal
  editModal.style.display = "block";

  // Save the index in the modal for reference during save
  editModal.setAttribute("data-index", index);
}

function closeEditModal() {
  // Close the modal
  document.getElementById("editModal").style.display = "none";
}

function saveEdit() {
  const editModal = document.getElementById("editModal");
  const index = parseInt(editModal.getAttribute("data-index"));

  const newName = document.getElementById("edit-item-name").value;
  const newPrice = parseFloat(document.getElementById("edit-item-price").value);
  const newQty = parseInt(document.getElementById("edit-item-qty").value);

  if (newName && !isNaN(newPrice) && !isNaN(newQty) && newQty > 0) {
    // Update the item in the list
    itemList[index].name = newName;
    itemList[index].price = newPrice;
    itemList[index].qty = newQty;
    itemList[index].total = newPrice * newQty;

    updateItemList();
    updateTotalPrice();

    // Close the modal
    closeEditModal();
  } else {
    alert("Please enter valid item details.");
  }
}

// ... (previous code)

function printBill() {
  const printWindow = window.open("", "_blank");
  printWindow.document.write("<html><head><title>Print Bill</title>");

  printWindow.document.write("<style>");
  printWindow.document.write("body { max-width: 800px; margin: auto; }"); // Adjust max-width as needed
  printWindow.document.write(
    "table { border-collapse: collapse; width: 100%; }"
  );
  printWindow.document.write(
    "th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }"
  );
  printWindow.document.write("th { background-color: #f2f2f2; }");
  printWindow.document.write("</style>");

  printWindow.document.write("</head><body>");
  printWindow.document.write(
    '<header style="text-align: left; margin: 20px 0;">'
  );

  // Dynamically load company logo
  const companyLogo = document.getElementById("company-logo");
  const logoPath = "C:\\Users\\HP\\Downloads\\New folder\\BMW-Logo-PNG.png";
  companyLogo.src = "file:///" + logoPath.replace(/\\/g, "/");

  printWindow.document.write(
    '<div id="company-header" style="display: flex; align-items: center;">'
  );
  printWindow.document.write(
    '<img src="' +
      companyLogo.src +
      '" alt="Company Logo" style="max-width: 50px; margin-right: 10px;">'
  );
  printWindow.document.write(
    '<h1 style="font-size: 1.5rem; margin-bottom: 5px;">Company Name</h1>'
  );
  printWindow.document.write("</div>");

  printWindow.document.write(
    "<p>Customer Name: " +
      document.getElementById("customer-name").value +
      "</p>"
  );
  printWindow.document.write(
    "<p>Customer Address: " +
      document.getElementById("customer-address").value +
      "</p>"
  );

  const orderDateTime = new Date(
    document.getElementById("order-date-time").value
  );
  const formattedDateTime = formatDate(orderDateTime);
  printWindow.document.write(
    "<p>Order Date and Time: " + formattedDateTime + "</p>"
  );

  printWindow.document.write("<table>");
  printWindow.document.write(
    "<thead><tr><th>Item Name</th><th>Price</th><th>Quantity</th></tr></thead>"
  );
  printWindow.document.write("<tbody>");

  itemList.forEach((item) => {
    printWindow.document.write(
      `<tr><td>${item.name}</td><td>$${item.price.toFixed(2)}</td><td>${
        item.qty
      }</td></tr>`
    );
  });

  printWindow.document.write("</tbody></table>");

  printWindow.document.write(
    "<p>Total Price: $" + totalPrice.toFixed(2) + "</p>"
  );
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
}

function formatDate(date) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

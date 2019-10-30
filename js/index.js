function deleteItem(event) {
  event.currentTarget.parentNode.remove();
}

function getPriceByProduct(itemNode) {
  let price = itemNode.querySelector('.product__cost').innerHTML;
  let qty = itemNode.querySelector('#qty').value;
  let total = itemNode.querySelector('.product__total');
  price = parseFloat(price.replace(/\$/g, ''));
  total.innerHTML = `$${(price * qty).toFixed(2)}`;
}

function updatePriceByProduct(productPrice, index) {
  const newTotal = document.createElement('span');
  newTotal.classList.add("product__total");
  newTotal.innerHTML = '$0.00';
  return newTotal;
}

function getTotalPrice() {
  const products = [...document.querySelectorAll('.product')];
  products.forEach(product => {
    getPriceByProduct(product);
  });
  const prices = [...document.querySelectorAll('.product__total')]
    .map(price => parseFloat(price.innerHTML.replace(/\$/g, '')))
    .reduce((price, total) => price + total);
  const total = document.querySelector('#total');
  total.innerHTML = `$${prices.toFixed(2)}`;
}

function createItemNode(dataType, itemData) {
  const nameConteiner = document.createElement('span');
  const newName = document.querySelector('#name').value;
  nameConteiner.classList.add('product__name');
  nameConteiner.innerHTML = newName;
  return nameConteiner;
}

function createPriceNode() {
  const priceConteiner = document.createElement('span');
  const newPrice = document.querySelector('#price').value;
  priceConteiner.classList.add('product__cost');
  console.log(typeof newPrice);
  priceConteiner.innerHTML = `$${parseFloat(newPrice).toFixed(2)}`;
  return priceConteiner;
}

function createQuantityInput() {
  const newInput = document.createElement('div');
  newInput.classList.add('product__qty');
  newInput.innerHTML = `
    <label for="qty">QTY</label>
    <input type="text" id="qty" name="qty" value="0" />
  `;
  return newInput;
}

function createTotalInput() {
  const newTotal = document.createElement('span');
  newTotal.classList.add('product__total');
  newTotal.innerHTML = '$0.00';
  return newTotal;
}

function createDeleteButton() {
  const newButton = document.createElement('button');
  newButton.innerHTML = 'Delete';
  newButton.setAttribute('class', 'btn btn-delete');
  newButton.onclick = deleteItem;
  return newButton;
}

function createNewItemRow(itemName, itemUnitPrice) {
  const newProduct = document.createElement('div');
  newProduct.classList.add('product');
  newProduct.appendChild(createItemNode());
  newProduct.appendChild(createPriceNode());
  newProduct.appendChild(createQuantityInput());
  newProduct.appendChild(createTotalInput());
  newProduct.appendChild(createDeleteButton());
  return newProduct;
}

function createNewItem() {
  const productsSection = document.querySelector('#products');
  const newProduct = createNewItemRow();
  productsSection.appendChild(newProduct);
  document.querySelector('#name').value = '';
  document.querySelector('#price').value = '';
}

window.onload = function() {
  var calculatePriceButton = document.getElementById('calc-prices-button');
  var createItemButton = document.getElementById('new-item-create');
  var deleteButtons = document.getElementsByClassName('btn-delete');

  calculatePriceButton.onclick = getTotalPrice;
  createItemButton.onclick = createNewItem;

  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].onclick = deleteItem;
  }
};

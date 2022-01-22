const addLi = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove();

  saveCartItems(addLi.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// função que adiciona itens no carrinho 
// Função desenvolvida com auxilio do Mario Junior
async function addItemCart() {
  const buttonAdd = document.querySelectorAll('.item__add');
  return buttonAdd.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const idItem = await getSkuFromProductItem(event.target.parentNode);
      const { id: sku, title: name, price: salePrice } = await fetchItem(idItem);
      addLi.appendChild(createCartItemElement({ sku, name, salePrice }));

      saveCartItems(addLi.innerHTML);
    });
  });
}

// função que inicia página com produtos na tela 'computador'
async function init() {
  const objProducts = await fetchProducts('computador');
  const results = await objProducts.results;
  const items = document.querySelector('.items');
  results.forEach((product) => {
    const { id: sku, title: name, thumbnail: image } = product;
    const resultProduct = createProductItemElement({ sku, name, image });  

    items.appendChild(resultProduct);
  });
  addItemCart();
}

// Requisito 4, função que retorna dados do localStorage e adiciona evento de 'click'
// Requisito 4 resolvido após monitoria em grupo com Thalles.
function returnItemsCart() {
  addLi.innerHTML = getSavedCartItems();
  addLi.addEventListener('click', cartItemClickListener);
}

window.onload = async () => { 
  await init();
  
  returnItemsCart();
};

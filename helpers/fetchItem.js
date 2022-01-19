const fetchItem = async (idItem) => {
  const urlItem = `https://api.mercadolibre.com/items/${idItem}`;
  const response = await fetch(urlItem);
  const result = await response.json();
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}

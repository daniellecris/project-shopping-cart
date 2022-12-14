require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
    it('1 - Verifica se fetchProduct é uma função', async () => {
    expect(fetchProducts).toBeInstanceOf(Function);
  })

  it('2 - Verifica se passando o parametro "computador" a função fetchProduct é chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
  })

  it('3 - Verifica se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', async () => {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('4 - Verifica se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async() => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  })

  // Pesquisa de Matcher para mensagem de erro... https://www.devmedia.com.br/teste-unitario-com-jest/41234
  it('5 - Verifica se ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    await expect(fetchProducts()).rejects.toThrow('You must provide an url');
  })
});

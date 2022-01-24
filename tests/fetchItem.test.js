require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('1 - Verifica se fetProduct é uma função', async () => {
    expect(fetchItem).toBeInstanceOf(Function);
  })

  it('2 - Executa a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalled();
  })

  it('3 - Verifica se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(endpoint);
  })

  it('4 - Verifica se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo.', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  })

  // Pesquisa de Matcher para mensagem de erro... https://www.devmedia.com.br/teste-unitario-com-jest/41234
  it('5 - Verifica se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url.', async () => {
    await expect(fetchItem()).rejects.toThrow('You must provide an url');
  })
});

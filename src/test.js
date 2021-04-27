/*
    importar o assert
    iniciar uma switch de testes
    criar teste de listas heróis
    criar teste de cadastrar um herói

    cada teste tem as seguintes características:
        A resposta esperada
        O processamento
        A comparação de respostas
 */

import assert from 'assert';

import database from './database.js';

const DEFAULT_ITEM_HERO = {
  id: 1,
  nome: "Flash",
  poder: "Speed"
}
const DEFAULT_ITEM_CREATE = {
  nome: "Day",
  poder: "Food"
}

describe('Suite de manipulações de heróis', () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_HERO);
  })

  it('deve pesquisar um herói usando arquivos', async () => {
    const expected = DEFAULT_ITEM_HERO;
    const [resposta] = await database.listar(expected.id);

    assert.deepStrictEqual(resposta, expected);
  })

  it('deve cadastrar um novo herói no arquivo', async () => {
    const expected = DEFAULT_ITEM_CREATE;
    const novoHero = await database.cadastrar(expected)

    assert.ok(novoHero);
  })

  it('deve atualizar um herói pelo id informado', async () => {
    const newHero = {
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    const expected = {
      ...DEFAULT_ITEM_HERO,
      nome: 'Batman',
      poder: 'Dinheiro'
    }
    await database.atualizar(DEFAULT_ITEM_HERO.id, newHero);
    const [resultado] = await database.listar(DEFAULT_ITEM_HERO.id);

    assert.deepStrictEqual(resultado, expected);
  })

  it('deve remover um herói da lista ou todos se o id não for passado', async () => {
    const expected = true;
    const resposta = await database.remove(DEFAULT_ITEM_HERO.id);

    assert.deepStrictEqual(resposta, expected);
  })
})

/*
    importar do fs o readFile
    importar o promisify do util

    transformar o readFile em uma promise

    criar uma classe database com:
        construtor tendo o nome do arquivo
        3 métodos:
            obterDadosArquivo -> obter os dados e retornar em json
            listar(id) -> pegar os dados, filtrar pelo id e caso ele
                não for passado retornar todos
            escreverArquivo
*/

import { readFileSync, writeFileSync } from 'fs';

class Database {
  constructor(){
    this.NOME_ARQUIVO = './src/herois.json'
  }

  async obterDadosArquivo() {
    const arquivo = await readFileSync(this.NOME_ARQUIVO, 'utf8');
    return JSON.parse(arquivo.toString());
  }

  async escreverArquivo(dados) {
    await writeFileSync(this.NOME_ARQUIVO, JSON.stringify(dados));
    return true;
  }

  async cadastrar(hero){
    const arquivo = await this.obterDadosArquivo();
    const id = Date.now();
    const dataHero = { id, ...hero }
    const dataFile = [...arquivo, dataHero];

    const resposta = await this.escreverArquivo(dataFile);
    return resposta;
  }

  async listar(id) {
    const dados = await this.obterDadosArquivo();
    const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true));
    return dadosFiltrados
  }

  async atualizar(id, newData) {
    const dados = await this.obterDadosArquivo();
    const index = dados.findIndex(item => item.id === parseInt(id));

    if(index === -1){
      throw Error('O usuário  informado não existe');
    }
    const atual = dados[index];
    const objAtualizado = {
      ...atual,
      ...newData
    }

    dados.splice(index, 1);

    return await this.escreverArquivo([
      ...dados,
      objAtualizado
    ])
  }

  async remove(id) {
    if(!id) {
      return await this.escreverArquivo([]);
    }

    const dados = await this.obterDadosArquivo();
    const index = dados.findIndex(item => item.id === parseInt(id));

    if(index === -1){
      throw Error('O usuário  informado não existe');
    }

    dados.splice(index, 1);

    return await this.escreverArquivo(dados);
  }
}

export default new Database();

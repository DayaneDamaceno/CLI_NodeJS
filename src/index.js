import { Command } from 'commander';
import database from './database.js';
import Heroi from './heroi.js';

async function main() {
  const Commander = new Command();
  const options = Commander.opts();

  Commander.version('v1')
    .option('-n --nome [value]', 'Nome do herói')
    .option('-p --poder [value]', 'Poder do herói')
    .option('-i --id [value]', 'ID do herói')

    .option('-c --cadastrar', 'Cadastrar um herói')
    .option('-l --listar', 'Listar um herói')
    .option('-a --atualizar [value]', 'Atualizar um herói pelo id')
    .option('-r --remover', 'Remover um herói pelo id')
    .parse(process.argv)

    const heroi = new Heroi(options)

  try {
    if(options.cadastrar){
      delete heroi.id;
      const resultado = await database.cadastrar(heroi);
      if (!resultado) {
        console.error("😢 Herói não foi cadastrado");
      }
      console.log("✔ Herói foi cadastrado com sucesso!");
    }

    if(options.listar){
      const resultado = await database.listar();
      console.log(resultado);
      return;
    }

    if(options.atualizar){
      const idParaAtualizar = parseInt(options.atualizar);
      const dado = JSON.stringify(heroi);
      const heroiAtualizado = JSON.parse(dado);
      const resultado = await database.atualizar(idParaAtualizar, heroiAtualizado);

      if(!resultado) {
        console.error('😢 Não foi possível atualizar o heroi');
        return;
      }
      console.log('✔ Herói atualizado com sucesso');
    }

    if(options.remover){
      const resultado = await database.remove(heroi.id);
      if(!resultado) {
        console.error('😢 Não foi possível remover o heroi')
        return;
      }
      console.log('✔ Herói removido com sucesso');
    }

  } catch (error) {
    console.error('Erro interno', error);
  }
}

main();

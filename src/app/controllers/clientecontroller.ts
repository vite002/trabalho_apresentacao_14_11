import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Cliente from '../models/cliente';

class ClienteController{

async find(req: Request, res: Response){

    const repository = getRepository(Cliente);
    const id = req.params.id;
    const cli = await repository.createQueryBuilder('tb_pessoa').where({"id":id}).leftJoinAndSelect("tb_pessoa.carros", "carro").getOne();

    if(cli){     
        console.log(cli);      
        return res.json(cli);
    }else{
        return res.sendStatus(204);
    }
}  

async list(req: Request, res: Response){

    const repository = getRepository(Cliente);
    const lista = await repository.createQueryBuilder('tb_pessoa').leftJoinAndSelect("tb_pessoa.carros", "carro").getMany();
    return res.json(lista);
}

async delete(req: Request, res: Response){

    const repository = getRepository(Cliente);//recupera o repositorio do Cliente.
    const id = req.params.id;
    const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname da mensagem.

    if(idExists){
    
        await repository.remove(idExists);//caso exista, então aplica a remocao fisica. (corrigir erro no pdf 11)
        return res.sendStatus(204);//retorna o coigo 204.
    
    }else{
    
        return res.sendStatus(404);//se nao encontrar Cliente para remover, retorna o codigo 404.
    }
}

async update(req: Request, res: Response){

    const repository = getRepository(Cliente);//recupera o repositorio do Cliente.
    const {id} = req.body;//extrai os atributos id do corpo da mensagem
    const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname.
    
    if(!idExists){
        return res.sendStatus(404);
    }
    
    const cli = repository.create(req.body); //cria a entidade Cliente
    await repository.save(cli); //persiste (update) a entidade na tabela.
    return res.json(cli);
}

async store(req: Request, res: Response){

    const repository = getRepository(Cliente);//recupera o repositorio do Patente.
    const {id} = req.body;//extrai os atributos id do corpo da mensagem
    const idExists = await repository.findOne({where : {id}});//consulta na tabela se existe um registro com o mesmo id da mensagem.

    if(!idExists){

        const cli = repository.create(req.body);//cria a entidade Jogador.
        await repository.save(cli);//efetiva a operacao de insert do Cliente.
        return res.json(cli);//retorna o bojeto json no response.

    }else{

        return res.sendStatus(409);//caso exista um registro, retorna 409 informando o conflito
    }   
}
}
export default new ClienteController();
import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Funcionario from '../models/funcionario';

class FuncionarioController {

async login(req: Request, res: Response){

    const repository = getRepository(Funcionario);
    const {id} = req.body;
    const fun = await repository.findOne({where : {"id" : id}});

    if(fun){           
        //  res.sendStatus(201);
        return res.json(fun);
    }else{
        return res.sendStatus(204);
    }
}

async find(req: Request, res: Response){

    const repository = getRepository(Funcionario);
    const id = req.params.id;
    const fun = await repository.createQueryBuilder('tb_pessoa').where({"id" : id}).innerJoinAndSelect("tb_pessoa.servico", "servico").getOne();

    if(fun){     
        console.log(fun);      
        return res.json(fun);
    }else{
        return res.sendStatus(204);
    }
}  

async list(req: Request, res: Response){

    const repository = getRepository(Funcionario);
    const lista = await repository.createQueryBuilder('tb_pessoa').innerJoinAndSelect("tb_pessoa.servico", "servico").getMany();
    return res.json(lista);
}

async delete(req: Request, res: Response){

    const repository = getRepository(Funcionario);//recupera o repositorio do Cliente.
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
    
    const repository = getRepository(Funcionario);//recupera o repositorio do Cliente.
    const {id} = req.body;//extrai os atributos id do corpo da mensagem
    const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname.
    
    if(!idExists){
        return res.sendStatus(404);
    }
    
    const fun = repository.create(req.body); //cria a entidade Cliente
    await repository.save(fun); //persiste (update) a entidade na tabela.
    return res.json(fun);
}

async store(req: Request, res: Response){

    const repository = getRepository(Funcionario);//recupera o repositorio do Patente.
    const {id} = req.body;//extrai os atributos id do corpo da mensagem
    const idExists = await repository.findOne({where : {id}});//consulta na tabela se existe um registro com o mesmo id da mensagem.

    if(!idExists){

        const fun = repository.create(req.body);//cria a entidade Jogador.
        await repository.save(fun);//efetiva a operacao de insert do Cliente.
        return res.json(fun);//retorna o bojeto json no response.

    }else{

        return res.sendStatus(409);//caso exista um registro, retorna 409 informando o conflito
    }   
}
}
export default new FuncionarioController();
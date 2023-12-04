import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Servico from '../models/servico';

class ServicoController{

async list(req: Request, res: Response){

    const repository = getRepository(Servico);
    const lista = await repository.createQueryBuilder('tb_servico').innerJoinAndSelect("tb_servico.cliente", "cliente").leftJoinAndSelect("tb_servico.carros", "carro").leftJoinAndSelect("tb_servico.pecas", "peca").getMany();
    return res.json(lista);

}

async store(req: Request, res: Response){

    const repository = getRepository(Servico);//recupera o repositorio do Patente.
    const {id} = req.body;//extrai os atributos id do corpo da mensagem
    const idExists = await repository.findOne({where : {id}});//consulta na tabela se existe um registro com o mesmo cpf da mensagem.

    if(!idExists){

        const ser = repository.create(req.body);//cria a entidade Jogador.
        await repository.save(ser);//efetiva a operacao de insert do Cliente.
        return res.json(ser);//retorna o bojeto json no response.

    }else{

        return res.sendStatus(409);//caso exista um registro, retorna 409 informando o conflito
    }   
}

async delete(req: Request, res: Response){

    try{
        const repository = getRepository(Servico);
        const {id} = req.body;
        const servico = await repository.findOne({where : {"id" : id }});
        if(servico){
            await repository.remove(servico);
            return res.sendStatus(204);
        }else{
            return res.sendStatus(404);
        }
    }catch(ser:unknown){
    
        console.log(ser);
        return res.sendStatus(500);
    }
}

async update(req: Request, res: Response){
    
    const repository = getRepository(Servico);//recupera o repositorio do Cliente.
    const {id} = req.body;//extrai os atributos id do corpo da mensagem
    const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname.
    
    if(!idExists){
        return res.sendStatus(404);
    }
    
    const ser = repository.create(req.body); //cria a entidade Cliente
    await repository.save(ser); //persiste (update) a entidade na tabela.
    return res.json(ser);
}

async find(req: Request, res: Response){

    const repository = getRepository(Servico);
    const id = req.params.id;
    const ser = await repository.createQueryBuilder('tb_servico').where({"id" : id}).innerJoinAndSelect("tb_servico.cliente", "cliente").leftJoinAndSelect("tb_servico.carros", "carro").leftJoinAndSelect("tb_servico.pecas", "peca").getOne();

    if(ser){     
        console.log(ser);      
        return res.json(ser);
    }else{
        return res.sendStatus(204);
    }
}

}
export default new ServicoController();
import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Pecas from '../models/pecas';

class PecasController{
     
async list(req: Request, res: Response){

    const repository = getRepository(Pecas);
    const lista = await repository.find();
    return res.json(lista);

}
 
async store(req: Request, res: Response){

    const repository = getRepository(Pecas);//recupera o repositorio do Patente.
    const {id} = req.body;//extrai os atributos id do corpo da mensagem
    const idExists = await repository.findOne({where : {id}});//consulta na tabela se existe um registro com o mesmo cpf da mensagem.

    if(!idExists){

        const pec = repository.create(req.body);//cria a entidade Jogador.
        await repository.save(pec);//efetiva a operacao de insert do Cliente.
        return res.json(pec);//retorna o bojeto json no response.

    }else{

        return res.sendStatus(409);//caso exista um registro, retorna 409 informando o conflito
    }   
}

async delete(req: Request, res: Response){

    try{
        const repository = getRepository(Pecas);
        const {id} = req.body;
        const pecas = await repository.findOne({where : {"id" : id }});
        if(pecas){
            await repository.remove(pecas);
            return res.sendStatus(204);
        }else{
            return res.sendStatus(404);
        }
    }catch(pec:unknown){
    
        console.log(pec);
        return res.sendStatus(500);
    }
}

async update(req: Request, res: Response){
    
    const repository = getRepository(Pecas);//recupera o repositorio do Cliente.
    const {id} = req.body;//extrai os atributos id do corpo da mensagem
    const idExists = await repository.findOne({where :{id}});//consulta na tabela se existe um registro com o mesmo nickname.
    
    if(!idExists){
        return res.sendStatus(404);
    }
    
    const pec = repository.create(req.body); //cria a entidade Cliente
    await repository.save(pec); //persiste (update) a entidade na tabela.
    return res.json(pec);
}

async find(req: Request, res: Response){

    const repository = getRepository(Pecas);
    const id = req.params.id;
    const pec = await repository.createQueryBuilder('tb_pecas').where({"id": id}).getOne();

    if(pec){     
        console.log(pec);      
        return res.json(pec);
    }else{
        return res.sendStatus(204);
    }
}
}
export default new PecasController();
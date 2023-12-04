import {Request, Response} from 'express';
import {getRepository} from 'typeorm';
import Carro from '../models/carro';

class CarroController{

async list(req: Request, res: Response){
    const repository = getRepository(Carro);
    const lista = await repository.find();
    return res.json(lista);
}

    //metodos para a insercao, alteracao e remoçao de Endereco.

async store(req: Request, res: Response){

    const repository = getRepository(Carro);//recupera o repositorio do Patente.
    const {placa} = req.body;//extrai os atributos id do corpo da mensagem
    const placaExists = await repository.findOne({where : {placa}});//consulta na tabela se existe um registro com o mesmo cpf da mensagem.

    if(!placaExists){

        const car = repository.create(req.body);//cria a entidade Jogador.
        await repository.save(car);//efetiva a operacao de insert do Cliente.
        return res.json(car);//retorna o bojeto json no response.

    }else{

        return res.sendStatus(409);//caso exista um registro, retorna 409 informando o conflito
    }   
}
    
async delete(req: Request, res: Response){

    try{
        const repository = getRepository(Carro);
        const {placa} = req.body;
        const carro = await repository.findOne({where : {placa }});
        if(carro){
            await repository.remove(carro);
            return res.sendStatus(204);
        }else{
            return res.sendStatus(404);
        }
    }catch(car:unknown){
    
        console.log(car);
        return res.sendStatus(500);
    }
}

async update(req: Request, res: Response){

    const repository = getRepository(Carro);//recupera o repositorio do Cliente.
    const {placa} = req.body;//extrai os atributos id do corpo da mensagem
    const placaExists = await repository.findOne({where :{placa}});//consulta na tabela se existe um registro com o mesmo nickname.
    
    if(!placaExists){
        return res.sendStatus(404);
    }
    
    const car = repository.create(req.body); //cria a entidade Cliente
    await repository.save(car); //persiste (update) a entidade na tabela.
    return res.json(car);
}

async find(req: Request, res: Response){

    const repository = getRepository(Carro);
    const placa = req.params.placa;
    const car = await repository.createQueryBuilder('tb_carro').where({"placa": placa}).getOne();

    if(car){     
        console.log(car);      
        return res.json(car);
    }else{
        return res.sendStatus(204);
    }
}
}
export default new CarroController();
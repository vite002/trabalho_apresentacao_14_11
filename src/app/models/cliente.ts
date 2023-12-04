import {ChildEntity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable} from 'typeorm';
import Carro from '../models/carro';
import Pessoa from '../models/pessoa';

@ChildEntity()
class Cliente extends Pessoa{

    @Column('text')
    observacao: string;

    @Column('date')
    data_ultimo_servico: Date;

    //agregacao (losango não preenchido)
    @ManyToMany(() => Carro)
    @JoinTable({name : "tb_cliente_carro", 
                joinColumn: {name: "cliente_id", 
                             referencedColumnName: "id"}, 
                inverseJoinColumn: {name: "carro_placa", 
                                    referencedColumnName: "placa"}})
    carros: Carro[];
}
export default Cliente;
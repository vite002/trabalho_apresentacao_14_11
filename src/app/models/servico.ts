import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from 'typeorm';
import Carro from '../models/carro';
import Pecas from '../models/pecas';
import Cliente from '../models/cliente';

@Entity('tb_servico')
class Servico {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('date', {default: () => 'CURRENT_TIMESTAMP'})
    data_pedido: Date;

    @Column('date')
    data_previsao_entrega: Date;

    @Column('text')
    descricao: string;

    //agregacao (losango não preenchido)
    @ManyToMany(() => Carro)
    @JoinTable({name : "tb_servico_carro", 
                joinColumn: {name: "servico_id", 
                             referencedColumnName: "id"}, 
                inverseJoinColumn: {name: "carro_placa", 
                                    referencedColumnName: "placa"}})
    carros: Carro[];

    @ManyToMany(() => Pecas)
    @JoinTable({name : "tb_servico_pecas", 
                joinColumn: {name: "servico_id", 
                            referencedColumnName: "id"}, 
                inverseJoinColumn: {name: "pecas_id", 
                                    referencedColumnName: "id"}})
    pecas: Pecas[];

    //associação (flecha)
    @ManyToOne(type => Cliente)
    @JoinColumn({name: "cliente_id", referencedColumnName: "id"})
    cliente: Cliente; 
}

export default Servico;
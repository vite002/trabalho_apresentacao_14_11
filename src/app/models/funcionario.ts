import {ChildEntity, Column, PrimaryColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable} from 'typeorm';
import Servico from '../models/servico';
import Pessoa from '../models/pessoa';


@ChildEntity()
class Funcionario extends Pessoa{

    @Column('text')
    cargo: string;

    @Column('date')
    data_contratação: Date;

    //associação (flecha)
    @ManyToOne(type => Servico)
    @JoinColumn({name: "servico_id", referencedColumnName: "id"})
    servico: Servico; 
    
}
export default Funcionario;
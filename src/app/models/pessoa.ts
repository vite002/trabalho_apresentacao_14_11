import {Entity, Column, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@Entity('tb_pessoa')
@TableInheritance({ column: { type: "varchar", name: "type" } })
abstract class Pessoa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nome: string;

    @Column('text')
    cpf: string;

    @Column('int')
    senha: number;

    @Column('text')
    endereco: string;

}
export default Pessoa;
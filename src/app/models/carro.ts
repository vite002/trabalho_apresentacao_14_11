import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity('tb_carro')
class Carro {

    @PrimaryColumn()
    placa: string;

    @Column('int')
    ano: number;

    @Column('text')
    modelo: string;
}
export default Carro;
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity('pacientes')

export default class Pacientes {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    cidade: string;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    telefone: string;
    
    @Column()
    foto: string;

}
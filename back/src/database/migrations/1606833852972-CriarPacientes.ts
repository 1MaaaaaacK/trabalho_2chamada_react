import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarPacientes1606833852972 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'pacientes',
			columns: [
				{
					name: 'id',
					type: 'integer',
					unsigned: true,
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'increment'
				},
				{
					name: 'name',
					type: 'varchar'
				},
				{
					name: 'cidade',
					type: 'varchar',
				},
				{
					name: 'cpf',
					type: 'varchar'
				},
				{
					name: 'email',
					type: 'varchar'
				},
				{
					name: 'telefone',
					type: 'varchar'
				},
				{
					name: 'foto',
					type: 'varchar'
				}
			]
		}))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
	}

}

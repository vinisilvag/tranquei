import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateLocks1630383075280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'locks',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'user_id',
          type: 'uuid',
          isNullable: true,
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createForeignKey('locks', new TableForeignKey({
      name: 'LockUserID',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('locks', 'LockUserID');
    await queryRunner.dropTable('locks');
  }
}

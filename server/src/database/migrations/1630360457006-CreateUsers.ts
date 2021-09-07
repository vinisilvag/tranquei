import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';
import { UserRoles } from '../../enums/UserRoles';

export class CreateUsers1630360457006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
        },
        {
          name: 'avatar_url',
          type: 'varchar',
        },
        {
          name: 'active',
          type: 'boolean',
          default: true,
        },
        {
          name: 'role',
          type: 'enum',
          enum: [UserRoles.NORMAL, UserRoles.ADMIN],
          enumName: 'roleEnum',
          default: `'${UserRoles.NORMAL}'`,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}

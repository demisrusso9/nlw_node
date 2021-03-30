import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateSurveysUsers1616456641135 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'surveys_users',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'user_id',
          type: 'varchar',
          generationStrategy: 'uuid'
        },
        {
          name: 'survey_id',
          type: 'varchar',
          generationStrategy: 'uuid'
        },
        {
          name: 'value',
          type: 'number',
          isNullable: true
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        }
      ],

      foreignKeys: [
        {
          name: 'FKUsers',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        {
          name: 'FKSurveys',
          referencedTableName: 'surveys',
          referencedColumnNames: ['id'],
          columnNames: ['survey_id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('surveys_users')
  }
}

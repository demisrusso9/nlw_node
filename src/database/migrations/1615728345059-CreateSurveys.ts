import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveys1615728345059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "surveys",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid"
          },
          {
            name: "title",
            type: "varchar"
          },
          {
            name: "description",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()"
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("surveys");
  }
}

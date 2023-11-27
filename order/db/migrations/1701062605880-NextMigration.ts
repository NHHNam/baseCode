import { MigrationInterface, QueryRunner } from "typeorm";

export class NextMigration1701062605880 implements MigrationInterface {
    name = 'NextMigration1701062605880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`createdDate\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`createdDate\``);
    }

}

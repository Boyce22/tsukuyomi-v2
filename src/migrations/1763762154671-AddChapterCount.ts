import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChapterCount1763762154671 implements MigrationInterface {
    name = 'AddChapterCount1763762154671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "manga"
            ADD "chapterCount" integer NOT NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "manga" DROP COLUMN "chapterCount"
        `);
    }

}

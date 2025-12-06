import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterIdNumberToUuid1763768750711 implements MigrationInterface {
    name = 'AlterIdNumberToUuid1763768750711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "page" DROP CONSTRAINT "FK_7b944dccbe9fe2d593584c2210c"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP CONSTRAINT "PK_275bd1c62bed7dff839680614ca"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "page" DROP CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f"
        `);
        await queryRunner.query(`
            ALTER TABLE "page" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "page" DROP COLUMN "chapterId"
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD "chapterId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD CONSTRAINT "FK_7b944dccbe9fe2d593584c2210c" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "page" DROP CONSTRAINT "FK_7b944dccbe9fe2d593584c2210c"
        `);
        await queryRunner.query(`
            ALTER TABLE "page" DROP COLUMN "chapterId"
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD "chapterId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "page" DROP CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f"
        `);
        await queryRunner.query(`
            ALTER TABLE "page" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP CONSTRAINT "PK_275bd1c62bed7dff839680614ca"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD CONSTRAINT "FK_7b944dccbe9fe2d593584c2210c" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}

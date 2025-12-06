import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUuidV4toUuidV71763807603840 implements MigrationInterface {
    name = 'AlterUuidV4toUuidV71763807603840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "page" DROP CONSTRAINT "FK_7b944dccbe9fe2d593584c2210c"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP CONSTRAINT "FK_4c5fd6f3063aaf78a2d13ff94f7"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP COLUMN "mangaId"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD "mangaId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag" DROP CONSTRAINT "FK_918249dadfad7841f6b97c7dd4b"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga" DROP CONSTRAINT "PK_86e5c2b6f8bede099e2906579b4"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga"
            ADD "id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "manga"
            ADD CONSTRAINT "PK_86e5c2b6f8bede099e2906579b4" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag" DROP CONSTRAINT "PK_0ae188422f1d6b1dbd19c9c062b"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag"
            ADD CONSTRAINT "PK_d2c6cdf1970a140fa2c64bd3a4a" PRIMARY KEY ("tagId")
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_918249dadfad7841f6b97c7dd4"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag" DROP COLUMN "mangaId"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag"
            ADD "mangaId" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag" DROP CONSTRAINT "PK_d2c6cdf1970a140fa2c64bd3a4a"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag"
            ADD CONSTRAINT "PK_0ae188422f1d6b1dbd19c9c062b" PRIMARY KEY ("tagId", "mangaId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_918249dadfad7841f6b97c7dd4" ON "manga_tag" ("mangaId")
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD CONSTRAINT "FK_4c5fd6f3063aaf78a2d13ff94f7" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD CONSTRAINT "FK_7b944dccbe9fe2d593584c2210c" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag"
            ADD CONSTRAINT "FK_918249dadfad7841f6b97c7dd4b" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "manga_tag" DROP CONSTRAINT "FK_918249dadfad7841f6b97c7dd4b"
        `);
        await queryRunner.query(`
            ALTER TABLE "page" DROP CONSTRAINT "FK_7b944dccbe9fe2d593584c2210c"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP CONSTRAINT "FK_4c5fd6f3063aaf78a2d13ff94f7"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_918249dadfad7841f6b97c7dd4"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag" DROP CONSTRAINT "PK_0ae188422f1d6b1dbd19c9c062b"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag"
            ADD CONSTRAINT "PK_d2c6cdf1970a140fa2c64bd3a4a" PRIMARY KEY ("tagId")
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag" DROP COLUMN "mangaId"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag"
            ADD "mangaId" integer NOT NULL
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_918249dadfad7841f6b97c7dd4" ON "manga_tag" ("mangaId")
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag" DROP CONSTRAINT "PK_d2c6cdf1970a140fa2c64bd3a4a"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag"
            ADD CONSTRAINT "PK_0ae188422f1d6b1dbd19c9c062b" PRIMARY KEY ("mangaId", "tagId")
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "manga" DROP CONSTRAINT "PK_86e5c2b6f8bede099e2906579b4"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga"
            ADD "id" SERIAL NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "manga"
            ADD CONSTRAINT "PK_86e5c2b6f8bede099e2906579b4" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag"
            ADD CONSTRAINT "FK_918249dadfad7841f6b97c7dd4b" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP COLUMN "mangaId"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD "mangaId" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD CONSTRAINT "FK_4c5fd6f3063aaf78a2d13ff94f7" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD CONSTRAINT "FK_7b944dccbe9fe2d593584c2210c" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}

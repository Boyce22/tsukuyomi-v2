import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBiography1763916302160 implements MigrationInterface {
    name = 'AddBiography1763916302160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."commentary_status_enum" AS ENUM('ACTIVED', 'DISABLED', 'REPORTED')
        `);
        await queryRunner.query(`
            CREATE TABLE "commentary" (
                "id" uuid NOT NULL,
                "value" character varying(300) NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "status" "public"."commentary_status_enum" NOT NULL DEFAULT 'ACTIVED',
                "mangaId" uuid NOT NULL,
                "chapterId" uuid,
                "userId" uuid NOT NULL,
                CONSTRAINT "PK_465979b97c47c504d1032b0e757" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "manga" DROP COLUMN "isActive"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "biography" character varying(255)
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "address" character varying(300)
        `);
        await queryRunner.query(`
            ALTER TABLE "commentary"
            ADD CONSTRAINT "FK_c62d8ea4734be15efdd0934ab29" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "commentary"
            ADD CONSTRAINT "FK_29c68e5a2011ae890f3e2ff55d0" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "commentary"
            ADD CONSTRAINT "FK_bf8192a335436327d296b685dc2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "commentary" DROP CONSTRAINT "FK_bf8192a335436327d296b685dc2"
        `);
        await queryRunner.query(`
            ALTER TABLE "commentary" DROP CONSTRAINT "FK_29c68e5a2011ae890f3e2ff55d0"
        `);
        await queryRunner.query(`
            ALTER TABLE "commentary" DROP CONSTRAINT "FK_c62d8ea4734be15efdd0934ab29"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "address"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "biography"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga"
            ADD "isActive" boolean NOT NULL DEFAULT true
        `);
        await queryRunner.query(`
            DROP TABLE "commentary"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."commentary_status_enum"
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1763713133437 implements MigrationInterface {
    name = 'InitialMigration1763713133437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "chapter" (
                "id" SERIAL NOT NULL,
                "number" integer NOT NULL,
                "title" character varying(255) NOT NULL,
                "summary" character varying(1024),
                "releaseDate" TIMESTAMP WITH TIME ZONE,
                "isMature" boolean NOT NULL DEFAULT false,
                "isActive" boolean NOT NULL DEFAULT true,
                "viewCount" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "mangaId" integer NOT NULL,
                "createdById" uuid,
                "updatedById" uuid,
                CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."manga_status_enum" AS ENUM('ACTIVE', 'DISABLED', 'REPORTED')
        `);
        await queryRunner.query(`
            CREATE TABLE "manga" (
                "id" SERIAL NOT NULL,
                "title" character varying(255) NOT NULL,
                "description" character varying(1024),
                "coverUrl" character varying(255) NOT NULL,
                "bannerUrl" character varying(255),
                "isMature" boolean NOT NULL DEFAULT false,
                "isActive" boolean NOT NULL DEFAULT true,
                "status" "public"."manga_status_enum" NOT NULL DEFAULT 'ACTIVE',
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "rating" double precision,
                "viewCount" integer NOT NULL DEFAULT '0',
                "favoriteCount" integer NOT NULL DEFAULT '0',
                "author" character varying(255),
                "artist" character varying(255),
                "publisher" character varying(255),
                "createdById" uuid,
                "updatedById" uuid,
                CONSTRAINT "PK_86e5c2b6f8bede099e2906579b4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "page" (
                "id" SERIAL NOT NULL,
                "number" integer NOT NULL,
                "imageUrl" character varying(255) NOT NULL,
                "thumbnailUrl" character varying(255),
                "fileSize" double precision,
                "format" character varying(10),
                "isActive" boolean NOT NULL DEFAULT true,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "chapterId" integer NOT NULL,
                "createdById" uuid,
                "updatedById" uuid,
                CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."role_name_enum" AS ENUM('USER', 'ADMIN', 'OWNER', 'MODERATOR')
        `);
        await queryRunner.query(`
            CREATE TABLE "role" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" "public"."role_name_enum" NOT NULL,
                "isActive" boolean NOT NULL DEFAULT true,
                CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"),
                CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tag" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(50) NOT NULL,
                "description" character varying(255) NOT NULL,
                "createdById" uuid,
                "updatedById" uuid,
                CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"),
                CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_role" (
                "user_id" uuid NOT NULL,
                "role_id" uuid NOT NULL,
                "assigned_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f634684acb47c1a158b83af5150" PRIMARY KEY ("user_id", "role_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying(50) NOT NULL,
                "lastName" character varying(50) NOT NULL,
                "userName" character varying(50) NOT NULL,
                "password" character varying(100) NOT NULL,
                "birthDate" date,
                "email" character varying(255) NOT NULL,
                "isVerified" boolean NOT NULL DEFAULT false,
                "profilePictureUrl" character varying(255),
                "lastPasswordChange" TIMESTAMP WITH TIME ZONE,
                "bannerUrl" character varying(255),
                CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "manga_tag" (
                "mangaId" integer NOT NULL,
                "tagId" uuid NOT NULL,
                CONSTRAINT "PK_0ae188422f1d6b1dbd19c9c062b" PRIMARY KEY ("mangaId", "tagId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_918249dadfad7841f6b97c7dd4" ON "manga_tag" ("mangaId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_d2c6cdf1970a140fa2c64bd3a4" ON "manga_tag" ("tagId")
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD CONSTRAINT "FK_4c5fd6f3063aaf78a2d13ff94f7" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD CONSTRAINT "FK_f4481e6dee22ffe08605eb4e9b8" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter"
            ADD CONSTRAINT "FK_2e4cf3b0b87ecd57c55c487726a" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "manga"
            ADD CONSTRAINT "FK_8af434d5ea4484b878af46a5987" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "manga"
            ADD CONSTRAINT "FK_3f62a6ccb5cc59c5cddf1e1f9fd" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD CONSTRAINT "FK_7b944dccbe9fe2d593584c2210c" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD CONSTRAINT "FK_5021d47dea711cebdc2b8b32327" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "page"
            ADD CONSTRAINT "FK_c7d14cd9228c7a71de073f50b1f" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tag"
            ADD CONSTRAINT "FK_c396eca2eb20b63382bc6508f1b" FOREIGN KEY ("createdById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "tag"
            ADD CONSTRAINT "FK_ff8396e7449590638482a4d127d" FOREIGN KEY ("updatedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_role"
            ADD CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_role"
            ADD CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag"
            ADD CONSTRAINT "FK_918249dadfad7841f6b97c7dd4b" FOREIGN KEY ("mangaId") REFERENCES "manga"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag"
            ADD CONSTRAINT "FK_d2c6cdf1970a140fa2c64bd3a4a" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);

        await queryRunner.query(`
            INSERT INTO "role" ("name") VALUES
            ('USER'),
            ('ADMIN'),
            ('OWNER'),
            ('MODERATOR')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "manga_tag" DROP CONSTRAINT "FK_d2c6cdf1970a140fa2c64bd3a4a"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga_tag" DROP CONSTRAINT "FK_918249dadfad7841f6b97c7dd4b"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_role" DROP CONSTRAINT "FK_32a6fc2fcb019d8e3a8ace0f55f"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_role" DROP CONSTRAINT "FK_d0e5815877f7395a198a4cb0a46"
        `);
        await queryRunner.query(`
            ALTER TABLE "tag" DROP CONSTRAINT "FK_ff8396e7449590638482a4d127d"
        `);
        await queryRunner.query(`
            ALTER TABLE "tag" DROP CONSTRAINT "FK_c396eca2eb20b63382bc6508f1b"
        `);
        await queryRunner.query(`
            ALTER TABLE "page" DROP CONSTRAINT "FK_c7d14cd9228c7a71de073f50b1f"
        `);
        await queryRunner.query(`
            ALTER TABLE "page" DROP CONSTRAINT "FK_5021d47dea711cebdc2b8b32327"
        `);
        await queryRunner.query(`
            ALTER TABLE "page" DROP CONSTRAINT "FK_7b944dccbe9fe2d593584c2210c"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga" DROP CONSTRAINT "FK_3f62a6ccb5cc59c5cddf1e1f9fd"
        `);
        await queryRunner.query(`
            ALTER TABLE "manga" DROP CONSTRAINT "FK_8af434d5ea4484b878af46a5987"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP CONSTRAINT "FK_2e4cf3b0b87ecd57c55c487726a"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP CONSTRAINT "FK_f4481e6dee22ffe08605eb4e9b8"
        `);
        await queryRunner.query(`
            ALTER TABLE "chapter" DROP CONSTRAINT "FK_4c5fd6f3063aaf78a2d13ff94f7"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_d2c6cdf1970a140fa2c64bd3a4"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_918249dadfad7841f6b97c7dd4"
        `);
        await queryRunner.query(`
            DROP TABLE "manga_tag"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "user_role"
        `);
        await queryRunner.query(`
            DROP TABLE "tag"
        `);
        await queryRunner.query(`
            DROP TABLE "role"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."role_name_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "page"
        `);
        await queryRunner.query(`
            DROP TABLE "manga"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."manga_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "chapter"
        `);
    }

}

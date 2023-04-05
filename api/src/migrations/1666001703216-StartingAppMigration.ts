import {MigrationInterface, QueryRunner} from "typeorm";

export class StartingAppMigration1666001703216 implements MigrationInterface {
    name = 'StartingAppMigration1666001703216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tagList" text NOT NULL, "productsCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "serviceName" character varying NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "body" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tagList" text NOT NULL, "places" integer NOT NULL DEFAULT '0', "favoritesCount" integer NOT NULL DEFAULT '0', "leftplaces" integer NOT NULL DEFAULT '0', "authorId" integer, "serviceId" integer, "favoritesId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "senderId" integer NOT NULL, "message" character varying NOT NULL, "edited" boolean NOT NULL DEFAULT false, "read" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "dialogId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dialogs" ("id" SERIAL NOT NULL, "dialogId" character varying NOT NULL, "ownerId" integer NOT NULL, "partnerId" integer NOT NULL, "image" character varying NOT NULL DEFAULT '', "lastMessage" character varying NOT NULL DEFAULT '', "readMessage" boolean NOT NULL DEFAULT false, "messagesCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_75ffe676a97ca2eb5510ec88b11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "comment" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, "targetUserId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL DEFAULT '', "phonenumber" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "bio" character varying NOT NULL DEFAULT '', "rate" integer NOT NULL DEFAULT '0', "likesCount" integer NOT NULL DEFAULT '0', "dislikesCount" integer NOT NULL DEFAULT '0', "reactionsCount" integer NOT NULL DEFAULT '0', "addedToFavoritesCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reaction_reaction_enum" AS ENUM('none', 'like', 'dislike')`);
        await queryRunner.query(`CREATE TABLE "reaction" ("id" SERIAL NOT NULL, "reaction" "public"."reaction_reaction_enum" NOT NULL DEFAULT 'none', "targetUserID" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, "targetUserId" integer, CONSTRAINT "PK_41fbb346da22da4df129f14b11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_favorites_products" ("usersId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_40f21f7df7c163f36987fbf1829" PRIMARY KEY ("usersId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8aee8ad2a408c631001be82eeb" ON "users_favorites_products" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0a08fdd35c8fbc59e57772db28" ON "users_favorites_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_76ec85a3cf5734a18f3fecda246" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_437a24ca00b5e953ade9f01be4d" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_877a1b205937c28b5789cffbba9" FOREIGN KEY ("favoritesId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_da5e0eb03e15dd7db2bb86fc153" FOREIGN KEY ("dialogId") REFERENCES "dialogs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD CONSTRAINT "FK_5c4eff6e60e2bc427373f0642e3" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dialogs" ADD CONSTRAINT "FK_7192467e4486cdb28bbf7d0598a" FOREIGN KEY ("partnerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_a9ed685110764ef5498c8fd1a40" FOREIGN KEY ("targetUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_3689cedb63e6688d1c87466a7cd" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reaction" ADD CONSTRAINT "FK_96d8c3324d785076c83b32e2f23" FOREIGN KEY ("targetUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_favorites_products" ADD CONSTRAINT "FK_8aee8ad2a408c631001be82eeb0" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_favorites_products" ADD CONSTRAINT "FK_0a08fdd35c8fbc59e57772db28d" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_favorites_products" DROP CONSTRAINT "FK_0a08fdd35c8fbc59e57772db28d"`);
        await queryRunner.query(`ALTER TABLE "users_favorites_products" DROP CONSTRAINT "FK_8aee8ad2a408c631001be82eeb0"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_96d8c3324d785076c83b32e2f23"`);
        await queryRunner.query(`ALTER TABLE "reaction" DROP CONSTRAINT "FK_3689cedb63e6688d1c87466a7cd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_a9ed685110764ef5498c8fd1a40"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP CONSTRAINT "FK_7192467e4486cdb28bbf7d0598a"`);
        await queryRunner.query(`ALTER TABLE "dialogs" DROP CONSTRAINT "FK_5c4eff6e60e2bc427373f0642e3"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_da5e0eb03e15dd7db2bb86fc153"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_877a1b205937c28b5789cffbba9"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_437a24ca00b5e953ade9f01be4d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_76ec85a3cf5734a18f3fecda246"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0a08fdd35c8fbc59e57772db28"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8aee8ad2a408c631001be82eeb"`);
        await queryRunner.query(`DROP TABLE "users_favorites_products"`);
        await queryRunner.query(`DROP TABLE "reaction"`);
        await queryRunner.query(`DROP TYPE "public"."reaction_reaction_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "dialogs"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "services"`);
    }

}

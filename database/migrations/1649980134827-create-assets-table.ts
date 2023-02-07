import {MigrationInterface, QueryRunner} from "typeorm";

export class createAssetsTable1649980134827 implements MigrationInterface {
    name = 'createAssetsTable1649980134827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "type" character varying NOT NULL, "code" character varying NOT NULL, "region" character varying NOT NULL, "currency" character varying NOT NULL, CONSTRAINT "UQ_bff60c1b89bff7edff592d85ea4" UNIQUE ("code"), CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "assets"`);
    }

}

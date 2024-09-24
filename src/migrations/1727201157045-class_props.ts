import { MigrationInterface, QueryRunner } from "typeorm";

export class ClassProps1727201157045 implements MigrationInterface {
    name = 'ClassProps1727201157045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "class" ADD "start" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "end"`);
        await queryRunner.query(`ALTER TABLE "class" ADD "end" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "current_count" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "current_count" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "current_count" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "class" ALTER COLUMN "current_count" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "end"`);
        await queryRunner.query(`ALTER TABLE "class" ADD "end" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "start"`);
        await queryRunner.query(`ALTER TABLE "class" ADD "start" TIMESTAMP NOT NULL`);
    }

}

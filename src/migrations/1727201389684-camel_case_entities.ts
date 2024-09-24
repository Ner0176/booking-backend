import { MigrationInterface, QueryRunner } from "typeorm";

export class CamelCaseEntities1727201389684 implements MigrationInterface {
    name = 'CamelCaseEntities1727201389684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unused_credit" RENAME COLUMN "expiration_date" TO "expirationDate"`);
        await queryRunner.query(`ALTER TABLE "reservation" RENAME COLUMN "last_modification" TO "lastModification"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "day_of_week"`);
        await queryRunner.query(`DROP TYPE "public"."class_day_of_week_enum"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "current_count"`);
        await queryRunner.query(`CREATE TYPE "public"."class_weekday_enum" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`);
        await queryRunner.query(`ALTER TABLE "class" ADD "weekDay" "public"."class_weekday_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "class" ADD "currentCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "currentCount"`);
        await queryRunner.query(`ALTER TABLE "class" DROP COLUMN "weekDay"`);
        await queryRunner.query(`DROP TYPE "public"."class_weekday_enum"`);
        await queryRunner.query(`ALTER TABLE "class" ADD "current_count" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "public"."class_day_of_week_enum" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`);
        await queryRunner.query(`ALTER TABLE "class" ADD "day_of_week" "public"."class_day_of_week_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "reservation" RENAME COLUMN "lastModification" TO "last_modification"`);
        await queryRunner.query(`ALTER TABLE "unused_credit" RENAME COLUMN "expirationDate" TO "expiration_date"`);
    }

}

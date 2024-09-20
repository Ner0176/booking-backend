import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1726835456173 implements MigrationInterface {
    name = ' $npmConfigName1726835456173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("id" SERIAL NOT NULL, "password" character varying NOT NULL, "lastLogin" TIMESTAMP, "userId" integer, CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "unused_credit" ("id" SERIAL NOT NULL, "expiration_date" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_a81c5ca407a888d13650deb29c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "email" character varying NOT NULL, "phone" character varying(9), "avatar" character varying, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recurring_schedule" ("id" SERIAL NOT NULL, "classId" integer, "userId" integer, CONSTRAINT "PK_723a45c15084391acb47b9dccce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."class_day_of_week_enum" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`);
        await queryRunner.query(`CREATE TABLE "class" ("id" SERIAL NOT NULL, "start" TIMESTAMP NOT NULL, "end" TIMESTAMP NOT NULL, "day_of_week" "public"."class_day_of_week_enum" NOT NULL, "capacity" integer NOT NULL, "current_count" integer NOT NULL, CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."reservation_status_enum" AS ENUM('Pending', 'Completed', 'Cancelled')`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "status" "public"."reservation_status_enum" NOT NULL, "last_modification" TIMESTAMP NOT NULL, "classId" integer, "userId" integer, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unused_credit" ADD CONSTRAINT "FK_0baf5e0eb8448b3244e54786711" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recurring_schedule" ADD CONSTRAINT "FK_3aa5602db74316be3a716ab4a42" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recurring_schedule" ADD CONSTRAINT "FK_b0de111764ff447523e01fe7f66" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_19dbf084491b0bee6e6093affad" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_529dceb01ef681127fef04d755d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_529dceb01ef681127fef04d755d"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_19dbf084491b0bee6e6093affad"`);
        await queryRunner.query(`ALTER TABLE "recurring_schedule" DROP CONSTRAINT "FK_b0de111764ff447523e01fe7f66"`);
        await queryRunner.query(`ALTER TABLE "recurring_schedule" DROP CONSTRAINT "FK_3aa5602db74316be3a716ab4a42"`);
        await queryRunner.query(`ALTER TABLE "unused_credit" DROP CONSTRAINT "FK_0baf5e0eb8448b3244e54786711"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TYPE "public"."reservation_status_enum"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TYPE "public"."class_day_of_week_enum"`);
        await queryRunner.query(`DROP TABLE "recurring_schedule"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "unused_credit"`);
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}

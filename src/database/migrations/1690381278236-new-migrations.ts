import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1690381278236 implements MigrationInterface {
    name = 'NewMigrations1690381278236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tbl_user_role_enum" AS ENUM('CUSTOMER', 'SERVICE_PROVIDER', 'SUPER_ADMIN')`);
        await queryRunner.query(`CREATE TYPE "public"."tbl_user_sign_up_type_enum" AS ENUM('DEFAULT', 'GOOGLE', 'APPLE', 'FACEBOOK')`);
        await queryRunner.query(`CREATE TABLE "tbl_user" ("created_by" integer, "updated_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "role" "public"."tbl_user_role_enum" NOT NULL, "email" text NOT NULL, "password" text NOT NULL DEFAULT '', "is_email_verified" boolean NOT NULL DEFAULT false, "sign_up_type" "public"."tbl_user_sign_up_type_enum" NOT NULL DEFAULT 'DEFAULT', CONSTRAINT "UQ_da03ffed3d54f7872792df358f2" UNIQUE ("email"), CONSTRAINT "PK_1262f713cac678ecfe15460073b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tbl_profile_gender_enum" AS ENUM('MALE', 'FEMALE', 'NOT_SPECIFIED', 'NULL')`);
        await queryRunner.query(`CREATE TABLE "tbl_profile" ("created_by" integer, "updated_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "first_name" text NOT NULL, "last_name" text NOT NULL, "phone_number" text NOT NULL, "company_logo" text, "company_name" text, "company_size" text, "company_address" text, "pfb_certificate" text, "vat_certificate" text, "gender" "public"."tbl_profile_gender_enum" NOT NULL DEFAULT 'NULL', "dob" TIMESTAMP, "address" text NOT NULL DEFAULT '', "user_id" integer, CONSTRAINT "REL_e6a0aa95306ed9c57974fe8b11" UNIQUE ("user_id"), CONSTRAINT "PK_fc7d40227f95c2d459306f15ff5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tbl_otp" ("created_by" integer, "updated_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" text NOT NULL, "otp" integer NOT NULL, "expiry_time" TIMESTAMP NOT NULL, CONSTRAINT "UQ_d69692e78478551de7df90f9a88" UNIQUE ("email"), CONSTRAINT "PK_3ab059a41a8b478b78f61bd49a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tbl_profile" ADD CONSTRAINT "FK_e6a0aa95306ed9c57974fe8b11b" FOREIGN KEY ("user_id") REFERENCES "tbl_user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tbl_profile" DROP CONSTRAINT "FK_e6a0aa95306ed9c57974fe8b11b"`);
        await queryRunner.query(`DROP TABLE "tbl_otp"`);
        await queryRunner.query(`DROP TABLE "tbl_profile"`);
        await queryRunner.query(`DROP TYPE "public"."tbl_profile_gender_enum"`);
        await queryRunner.query(`DROP TABLE "tbl_user"`);
        await queryRunner.query(`DROP TYPE "public"."tbl_user_sign_up_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tbl_user_role_enum"`);
    }

}

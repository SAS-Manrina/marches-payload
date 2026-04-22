import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_organizations_category" AS ENUM('fruits et legumes', 'complement alimentaire', 'conference', 'viandes et charcuteries', 'produits de la mer', 'produits laitiers', 'boulangerie et patisserie', 'produit de la ruche', 'oeuf et volailles', 'boissons locales', 'pepiniere', 'chocolat et confiseries', 'epices et condiments', 'conserve et confitures', 'articles en bois', 'poteries', 'decoration', 'bijoux artisanaux', 'vetement et accessoires', 'bien-etre', 'cosmetiques', 'papeteries', 'produits hygiene', 'atelier', 'glaces', 'aromatique', 'restauration', 'sport', 'boisson alcoolise');
  CREATE TYPE "public"."enum_organizations_presence" AS ENUM('chaque semaine', '3 fois par mois', '2 fois par mois', '1 fois par mois');
  CREATE TYPE "public"."enum_organizations_approval_status" AS ENUM('interesse', 'en cours', 'en attente', 'refus');
  CREATE TYPE "public"."enum_organizations_market_zone" AS ENUM('produits transformes', 'alimentaire', 'artisanal', 'service', 'divers', 'commune');
  CREATE TABLE "organizations_category" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_organizations_category",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "organizations" ADD COLUMN "phone" varchar;
  ALTER TABLE "organizations" ADD COLUMN "presence" "enum_organizations_presence";
  ALTER TABLE "organizations" ADD COLUMN "approval_status" "enum_organizations_approval_status";
  ALTER TABLE "organizations" ADD COLUMN "market_zone" "enum_organizations_market_zone";
  ALTER TABLE "organizations_category" ADD CONSTRAINT "organizations_category_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "organizations_category_order_idx" ON "organizations_category" USING btree ("order");
  CREATE INDEX "organizations_category_parent_idx" ON "organizations_category" USING btree ("parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "organizations_category" CASCADE;
  ALTER TABLE "organizations" DROP COLUMN "phone";
  ALTER TABLE "organizations" DROP COLUMN "presence";
  ALTER TABLE "organizations" DROP COLUMN "approval_status";
  ALTER TABLE "organizations" DROP COLUMN "market_zone";
  DROP TYPE "public"."enum_organizations_category";
  DROP TYPE "public"."enum_organizations_presence";
  DROP TYPE "public"."enum_organizations_approval_status";
  DROP TYPE "public"."enum_organizations_market_zone";`)
}

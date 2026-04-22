import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_participations_payment_method" AS ENUM('carte bancaire', 'virement', 'cheque', 'espece');
  CREATE TABLE "participations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"organization_id" integer NOT NULL,
  	"market_id" integer NOT NULL,
  	"status" varchar,
  	"booth_location" varchar,
  	"revenue" numeric,
  	"commission_pct" numeric,
  	"payment_method" "enum_participations_payment_method",
  	"paid" boolean DEFAULT false,
  	"paid_at" timestamp(3) with time zone,
  	"display_price" boolean DEFAULT false,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "participations_id" integer;
  ALTER TABLE "participations" ADD CONSTRAINT "participations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "participations" ADD CONSTRAINT "participations_market_id_markets_id_fk" FOREIGN KEY ("market_id") REFERENCES "public"."markets"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "participations_organization_idx" ON "participations" USING btree ("organization_id");
  CREATE INDEX "participations_market_idx" ON "participations" USING btree ("market_id");
  CREATE INDEX "participations_updated_at_idx" ON "participations" USING btree ("updated_at");
  CREATE INDEX "participations_created_at_idx" ON "participations" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_participations_fk" FOREIGN KEY ("participations_id") REFERENCES "public"."participations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_participations_id_idx" ON "payload_locked_documents_rels" USING btree ("participations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "participations" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "participations" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_participations_fk";
  
  DROP INDEX "payload_locked_documents_rels_participations_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "participations_id";
  DROP TYPE "public"."enum_participations_payment_method";`)
}

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PENDIENTE', 'EN_PROCESO', 'FINALIZADA');

-- AlterTable
ALTER TABLE "public"."ordenes" ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'PENDIENTE';

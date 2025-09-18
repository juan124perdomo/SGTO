-- AlterTable
ALTER TABLE "public"."ordenes" ADD COLUMN     "tecnico_asignado_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."ordenes" ADD CONSTRAINT "ordenes_tecnico_asignado_id_fkey" FOREIGN KEY ("tecnico_asignado_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

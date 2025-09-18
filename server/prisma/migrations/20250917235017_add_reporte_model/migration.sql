-- CreateTable
CREATE TABLE "public"."reportes" (
    "id" SERIAL NOT NULL,
    "orden_id" INTEGER NOT NULL,
    "tecnico_id" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reportes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reportes_orden_id_key" ON "public"."reportes"("orden_id");

-- AddForeignKey
ALTER TABLE "public"."reportes" ADD CONSTRAINT "reportes_orden_id_fkey" FOREIGN KEY ("orden_id") REFERENCES "public"."ordenes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reportes" ADD CONSTRAINT "reportes_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

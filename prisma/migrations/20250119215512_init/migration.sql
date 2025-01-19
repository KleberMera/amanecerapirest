-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "rol_id" INTEGER NOT NULL,
    "nombre" TEXT,
    "apellido" TEXT,
    "nombreComercial" TEXT,
    "username" TEXT,
    "email" TEXT,
    "password" TEXT,
    "telefono" TEXT,
    "firebaseUid" TEXT,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Acccion_acumulada" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "total_acumlado" INTEGER NOT NULL,
    "mes_acumulado" TEXT NOT NULL,
    "fecha_acumulado" TIMESTAMP(3) NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Acccion_acumulada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accion_comprada" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "accion" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "mes" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Accion_comprada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interes_ganado" (
    "id" SERIAL NOT NULL,
    "id_accion_comprada" INTEGER NOT NULL,
    "interes_generado" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interes_ganado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Total_Acciones_Usuario" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "total_acumulado" INTEGER NOT NULL,
    "total_comprada" INTEGER NOT NULL,
    "total_interes_ganado" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Total_Acciones_Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombreComercial_key" ON "Usuario"("nombreComercial");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_firebaseUid_key" ON "Usuario"("firebaseUid");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Acccion_acumulada" ADD CONSTRAINT "Acccion_acumulada_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accion_comprada" ADD CONSTRAINT "Accion_comprada_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interes_ganado" ADD CONSTRAINT "Interes_ganado_id_accion_comprada_fkey" FOREIGN KEY ("id_accion_comprada") REFERENCES "Accion_comprada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Total_Acciones_Usuario" ADD CONSTRAINT "Total_Acciones_Usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

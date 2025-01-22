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
    "rolId" INTEGER NOT NULL,
    "cedula" TEXT,
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
CREATE TABLE "AccionAcumulada" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "totalAcumulado" INTEGER NOT NULL,
    "mesAcumulado" TEXT NOT NULL,
    "fechaAcumulado" TIMESTAMP(3) NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccionAcumulada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccionComprada" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fechaCompra" TIMESTAMP(3) NOT NULL,
    "mesCompra" TEXT NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccionComprada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InteresGanado" (
    "id" SERIAL NOT NULL,
    "accionCompradaId" INTEGER NOT NULL,
    "interesGenerado" DECIMAL(65,30) NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InteresGanado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumenAccionesUsuario" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "totalAcumulado" INTEGER NOT NULL,
    "totalComprado" INTEGER NOT NULL,
    "totalInteresGanado" DECIMAL(65,30) NOT NULL,
    "fechaResumen" TIMESTAMP(3) NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumenAccionesUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cedula_key" ON "Usuario"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nombreComercial_key" ON "Usuario"("nombreComercial");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_firebaseUid_key" ON "Usuario"("firebaseUid");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccionAcumulada" ADD CONSTRAINT "AccionAcumulada_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccionComprada" ADD CONSTRAINT "AccionComprada_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InteresGanado" ADD CONSTRAINT "InteresGanado_accionCompradaId_fkey" FOREIGN KEY ("accionCompradaId") REFERENCES "AccionComprada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumenAccionesUsuario" ADD CONSTRAINT "ResumenAccionesUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

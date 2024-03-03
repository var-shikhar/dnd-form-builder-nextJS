/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `FormModal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FormModal_name_userId_key" ON "FormModal"("name", "userId");

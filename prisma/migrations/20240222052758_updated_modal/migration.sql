/*
  Warnings:

  - A unique constraint covering the columns `[shareURL]` on the table `FormModal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FormModal_shareURL_key" ON "FormModal"("shareURL");

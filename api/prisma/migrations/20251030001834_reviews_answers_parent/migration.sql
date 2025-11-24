-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "parentId" INTEGER;

-- CreateIndex
CREATE INDEX "Reviews_parentId_idx" ON "Reviews"("parentId");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Reviews"("id") ON DELETE SET NULL ON UPDATE CASCADE;

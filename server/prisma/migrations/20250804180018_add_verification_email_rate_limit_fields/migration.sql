-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "verifyEmailSentAt" TIMESTAMP(3),
ADD COLUMN     "verifyEmailSentCount" INTEGER;

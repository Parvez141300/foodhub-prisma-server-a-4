/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Payment_Gateway" AS ENUM ('CASH_ON_DELIVERY', 'SSLCOMMERZ');

-- CreateEnum
CREATE TYPE "Payment_Status" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'REFUNDED', 'PARTIALLY_REFUNDED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amount_paid" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bank_tran_id" TEXT,
ADD COLUMN     "paid_at" TIMESTAMP(3),
ADD COLUMN     "payment_gateway" "Payment_Gateway",
ADD COLUMN     "payment_status" "Payment_Status" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "refunded_amount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "transaction_id" TEXT,
ADD COLUMN     "val_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_transaction_id_key" ON "Order"("transaction_id");

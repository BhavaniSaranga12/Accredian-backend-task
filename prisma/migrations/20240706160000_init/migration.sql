-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "referrerName" TEXT NOT NULL,
    "referrerEmail" TEXT NOT NULL,
    "refereeName" TEXT NOT NULL,
    "refereeEmail" TEXT NOT NULL,
    "course" TEXT NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

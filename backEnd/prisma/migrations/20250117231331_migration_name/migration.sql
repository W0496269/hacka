-- CreateTable
CREATE TABLE "Employee" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "w_number" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

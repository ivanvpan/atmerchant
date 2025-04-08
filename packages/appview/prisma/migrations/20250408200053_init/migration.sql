-- CreateTable
CREATE TABLE "MerchantGroup" (
    "uri" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT,
    "name" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MerchantLocation" (
    "uri" TEXT NOT NULL PRIMARY KEY,
    "externalId" TEXT,
    "name" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "timezone" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "media" JSONB,
    "groupUri" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MerchantLocation_groupUri_fkey" FOREIGN KEY ("groupUri") REFERENCES "MerchantGroup" ("uri") ON DELETE RESTRICT ON UPDATE CASCADE
);

// tests/supir.test.js
const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/prismaClient");
const jwt = require("jsonwebtoken");

describe("Supir Controller Tests", () => {
  let adminToken;

  beforeEach(async () => {
    // Create test admin and get token
    const admin = await prisma.admin.create({
      data: {
        username: "testadmin",
        password: "hashedpassword",
      },
    });

    adminToken = jwt.sign(
      { adminId: admin.admin_id, username: admin.username },
      process.env.JWT_SECRET || "your_default_secret_key"
    );
  });

  describe("POST /api/supir", () => {
    it("should create new supir when admin authenticated", async () => {
      const supirData = {
        nama_supir: "Test Sopir",
        no_telepon: "081234567890",
        gambar_supir: "test.jpg",
        jumlah_antaran: 0,
        status_supir: "Tersedia",
        password: "testpass123",
      };

      const response = await request(app)
        .post("/api/supir")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(supirData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty(
        "data.nama_supir",
        supirData.nama_supir
      );
    });

    it("should not create new supir when not authenticated", async () => {
      const response = await request(app).post("/api/supir").send({});

      expect(response.status).toBe(401);
    });
  });

  describe("DELETE /api/supir/:id", () => {
    it("should delete supir when admin authenticated", async () => {
      // Create test supir
      const supir = await prisma.supir.create({
        data: {
          nama_supir: "Delete Test",
          no_telepon: "089876543210",
          jumlah_antaran: 0,
          status_supir: "Tersedia",
          password: "hashedpassword",
        },
      });

      const response = await request(app)
        .delete(`/api/supir/${supir.supir_id}`)
        .set("Authorization", `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Supir berhasil dihapus");

      // Verify deletion
      const deletedSupir = await prisma.supir.findUnique({
        where: { supir_id: supir.supir_id },
      });
      expect(deletedSupir).toBeNull();
    });
  });
});

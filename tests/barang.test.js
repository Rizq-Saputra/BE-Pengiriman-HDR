const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/prismaClient");

describe("Barang Endpoints", () => {
  let testBarang;

  beforeEach(async () => {
    await prisma.barang.deleteMany();
    testBarang = await prisma.barang.create({
      data: {
        nama_barang: "Kayu Meranti 5x10x4",
        kategori: "Meranti",
        harga: 50000,
      },
    });
  });

  describe("POST /api/barang", () => {
    it("should create a new barang", async () => {
      const uniqueName = `Test Barang ${Date.now()}`;
      const res = await request(app).post("/api/barang").send({
        nama_barang: uniqueName,
        kategori: "Meranti",
        harga: 50000,
      });
    
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty("barang_id");
      expect(res.body.data.nama_barang).toBe(uniqueName);
      testBarang = res.body.data;
    });

    it("should validate required fields", async () => {
      const res = await request(app).post("/api/barang").send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });
  });

  describe("GET /api/barang", () => {
    it("should get all barang with pagination", async () => {
      const res = await request(app)
        .get("/api/barang")
        .query({ page: 1, limit: 10 });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.body).toHaveProperty("meta");
    });

    it("should filter barang by kategori", async () => {
      const res = await request(app)
        .get("/api/barang")
        .query({ kategori: "Meranti" });

      expect(res.statusCode).toBe(200);
      expect(res.body.data[0].kategori).toBe("Meranti");
    });
  });

  describe("GET /api/barang/:id", () => {
    it("should get barang by id", async () => {
      const res = await request(app).get(`/api/barang/${testBarang.barang_id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.barang_id).toBe(testBarang.barang_id);
    });

    it("should return 404 for non-existent barang", async () => {
      const res = await request(app).get("/api/barang/999999");

      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /api/barang/:id", () => {
    it("should update barang", async () => {
      const res = await request(app)
        .put(`/api/barang/${testBarang.barang_id}`)
        .send({
          nama_barang: "Kayu Meranti 5x7x4",
          kategori: "Meranti",
          harga: 35000,
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.nama_barang).toBe("Updated Barang");
    });
  });

  describe("DELETE /api/barang/:id", () => {
    it("should delete barang", async () => {
      const res = await request(app).delete(
        `/api/barang/${testBarang.barang_id}`
      );

      expect(res.statusCode).toBe(200);
    });
  });
});

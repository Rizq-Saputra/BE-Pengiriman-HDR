const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/prismaClient");
const bcrypt = require("bcryptjs");
const { delay } = require("./helpers");

describe("Pelanggan API Endpoints", () => {
  let testPelanggan;
  let authToken;

  beforeEach(async () => {
    await prisma.pelanggan.deleteMany();
    await prisma.admin.deleteMany();
    testPelanggan = await prisma.pelanggan.create({
      data: {
        nama_pelanggan: "Test User",
        no_telepon: "081234567890",
        email: "test@example.com",
      },
    });

    // Create test admin
    const hashedPassword = await bcrypt.hash("testpass123", 10);
    const admin = await prisma.admin.create({
      data: {
        username: "testadmin",
        password: hashedPassword,
      },
    });

    // Login admin
    const res = await request(app).post("/api/auth/login").send({
      username: "testadmin",
      password: "testpass123",
    });

    delay(1000);

    authToken = res.body.token;

    // console.log('Admin token:', authToken);
  });

  describe("POST /api/pelanggan", () => {
    it("should create a new pelanggan", async () => {
      const res = await request(app).post("/api/pelanggan").send({
        nama_pelanggan: "John Doe",
        no_telepon: "087654321098",
        email: "john@example.com",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Pelanggan berhasil ditambahkan");
      expect(res.body.data).toHaveProperty("nama_pelanggan", "John Doe");
      expect(res.body.data.no_telepon).toBe("087654321098");
    });

    it("should clean phone number of non-numeric characters", async () => {
      const res = await request(app).post("/api/pelanggan").send({
        nama_pelanggan: "Jane Doe",
        no_telepon: "+62-812-3456-7890",
        email: "jane@example.com",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.data.no_telepon).toBe("6281234567890");
    });

    it("should validate required fields", async () => {
      const res = await request(app).post("/api/pelanggan").send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("errors");
    });

    it("should validate email format", async () => {
      const res = await request(app).post("/api/pelanggan").send({
        nama_pelanggan: "Invalid Email User",
        no_telepon: "081234567890",
        email: "invalid-email",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors[0].message).toBe("Email must be valid");
    });
  });

  describe("GET /api/pelanggan", () => {
    it("should get all pelanggan", async () => {
      const res = await request(app)
        .get("/api/pelanggan")
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Berhasil mendapatkan data pelanggan");
      expect(Array.isArray(res.body.data)).toBeTruthy();
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe("GET /api/pelanggan/:id", () => {
    it("should get pelanggan by id", async () => {
      const res = await request(app).get(
        `/api/pelanggan/${testPelanggan.pelanggan_id}`
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toMatchObject({
        nama_pelanggan: "Test User",
        email: "test@example.com",
      });
    });

    it("should return 404 for non-existent pelanggan", async () => {
      const res = await request(app).get("/api/pelanggan/999999");

      expect(res.statusCode).toBe(404);
      expect(res.body.message).toBe("Pelanggan tidak ditemukan");
    });
  });

  describe("PUT /api/pelanggan/:id", () => {
    it("should update pelanggan", async () => {
      const res = await request(app)
        .put(`/api/pelanggan/${testPelanggan.pelanggan_id}`)
        .send({
          nama_pelanggan: "Updated Name",
          no_telepon: "089999999999",
          email: "updated@example.com",
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.nama_pelanggan).toBe("Updated Name");
      expect(res.body.data.email).toBe("updated@example.com");
    });

    it("should handle updating non-existent pelanggan", async () => {
      const res = await request(app).put("/api/pelanggan/999999").send({
        nama_pelanggan: "Updated Name",
        no_telepon: "089999999999",
        email: "updated@example.com",
      });

      expect(res.statusCode).toBe(500);
    });
  });

  describe("DELETE /api/pelanggan/:id", () => {
    it("should delete pelanggan", async () => {
      const res = await request(app).delete(
        `/api/pelanggan/${testPelanggan.pelanggan_id}`
      );

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Pelanggan berhasil dihapus");

      // Verify deletion
      const getRes = await request(app).get(
        `/api/pelanggan/${testPelanggan.pelanggan_id}`
      );
      expect(getRes.statusCode).toBe(404);
    });

    it("should handle deleting non-existent pelanggan", async () => {
      const res = await request(app).delete("/api/pelanggan/999999");

      expect(res.statusCode).toBe(500);
    });
  });
});

// tests/auth.test.js
const request = require("supertest");
const app = require("../src/app");
const bcrypt = require("bcryptjs");
const prisma = require("../src/prismaClient");
const delay = require("./helpers").delay;

describe("Authentication Tests", () => {
  describe("Admin Authentication", () => {
    it("should login admin successfully", async () => {
      // Create test admin
      const hashedPassword = await bcrypt.hash("testpass123", 10);
      await prisma.admin.create({
        data: {
          username: "testadmin1",
          password: hashedPassword,
        },
      });

      delay(1000);

      const response = await request(app).post("/api/auth/login").send({
        username: "testadmin1",
        password: "testpass123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("refreshToken");
    });

    it("should not login admin with invalid credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        username: "invalidadmin",
        password: "invalidpass",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error");
    });

    it("should refresh token successfully", async () => {
      const hashedPassword = await bcrypt.hash("testpass123", 10);
      await prisma.admin.create({
        data: {
          username: "testadmin2",
          password: hashedPassword,
        },
      });

      const loginResponse = await request(app).post("/api/auth/login").send({
        username: "testadmin2",
        password: "testpass123",
      });

      const response = await request(app).post("/api/auth/refresh-token").send({
        refreshToken: loginResponse.body.refreshToken,
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    it("should log out admin successfully", async () => {
      const hashedPassword = await bcrypt.hash("testpass123", 10);
      await prisma.admin.create({
        data: {
          username: "testadmin3",
          password: hashedPassword,
        },
      });

      const loginResponse = await request(app).post("/api/auth/login").send({
        username: "testadmin3",
        password: "testpass123",
      });

      const response = await request(app)
        .post("/api/auth/logout")
        .set("Authorization", `Bearer ${loginResponse.body.token}`)
        .send({
          refreshToken: loginResponse.body.refreshToken,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
    });
  });

  describe("Supir Authentication", () => {
    it("should login supir successfully", async () => {
      // Create test Sopir
      const hashedPassword = await bcrypt.hash("sopirpass123", 10);
      await prisma.supir.create({
        data: {
          nama_supir: "Test Sopir",
          no_telepon: "081234567890",
          password: hashedPassword,
          jumlah_antaran: 0,
          status_supir: "Tersedia",
        },
      });

      const response = await request(app).post("/api/supir/auth/login").send({
        no_telepon: "081234567890",
        password: "sopirpass123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("supir");
    });
  });
});

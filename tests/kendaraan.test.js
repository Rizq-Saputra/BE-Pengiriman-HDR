const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/prismaClient');

describe('Kendaraan API Endpoints', () => {
    let testKendaraan;

    beforeEach(async () => {
        // Clean up before each test
        await prisma.kendaraan.deleteMany();

        // Create test data
        testKendaraan = await prisma.kendaraan.create({
            data: {
                plat_nomor: 'B 1234 XX',
                jenis_kendaraan: 'Truck',
                status_kendaraan: 'tersedia'
            }
        });
    });

    describe('POST /api/kendaraan', () => {
        it('should create a new kendaraan', async () => {
            const res = await request(app)
                .post('/api/kendaraan')
                .send({
                    plat_nomor: 'B 5678 YY',
                    jenis_kendaraan: 'Van',
                    status_kendaraan: 'Tersedia'
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('Kendaraan berhasil ditambahkan');
            expect(res.body.data).toHaveProperty('plat_nomor', 'B 5678 YY');
            expect(res.body.data.status_kendaraan).toBe('tersedia');
        });

        it('should validate required fields', async () => {
            const res = await request(app)
                .post('/api/kendaraan')
                .send({});

            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('errors');
        });

    });

    describe('GET /api/kendaraan', () => {
        it('should get all kendaraan', async () => {
            const res = await request(app)
                .get('/api/kendaraan');

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Berhasil mendapatkan data kendaraan');
            expect(Array.isArray(res.body.data)).toBeTruthy();
            expect(res.body.data).toHaveLength(1);
        });
    });

    describe('GET /api/kendaraan/:id', () => {
        it('should get kendaraan by id', async () => {
            const res = await request(app)
                .get(`/api/kendaraan/${testKendaraan.kendaraan_id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data).toMatchObject({
                plat_nomor: 'B 1234 XX',
                jenis_kendaraan: 'Truck',
            });
        });

        it('should return 404 for non-existent kendaraan', async () => {
            const res = await request(app)
                .get('/api/kendaraan/999999');

            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe('Kendaraan tidak ditemukan');
        });
    });

    describe('PUT /api/kendaraan/:id', () => {
        it('should update kendaraan', async () => {
            const res = await request(app)
                .put(`/api/kendaraan/${testKendaraan.kendaraan_id}`)
                .send({
                    plat_nomor: 'B 9999 ZZ',
                    jenis_kendaraan: 'Box',
                    status_kendaraan: 'dalam_pengiriman'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.plat_nomor).toBe('B 9999 ZZ');
            expect(res.body.data.status_kendaraan).toBe('dalam_pengiriman');
        });

    });

    describe('DELETE /api/kendaraan/:id', () => {
        it('should delete kendaraan', async () => {
            const res = await request(app)
                .delete(`/api/kendaraan/${testKendaraan.kendaraan_id}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Kendaraan berhasil dihapus');

            // Verify deletion
            const getRes = await request(app)
                .get(`/api/kendaraan/${testKendaraan.kendaraan_id}`);
            expect(getRes.statusCode).toBe(404);
        });

        it('should handle deleting non-existent kendaraan', async () => {
            const res = await request(app)
                .delete('/api/kendaraan/999999');

            expect(res.statusCode).toBe(500);
            expect(res.body.message).toBe('Gagal menghapus kendaraan');
        });
    });
});
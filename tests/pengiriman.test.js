const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/prismaClient');
const bcrypt = require('bcryptjs');
const { delay } = require('./helpers');

describe('Pengiriman API Endpoints', () => {
    let testPengiriman,
        authToken,
        barangId,
        supirId,
        kendaraanId,
        pelangganId;

    beforeEach(async () => {
        const hashedPassword = await bcrypt.hash('testpass123', 10)
        const admin = await prisma.admin.create({
            data: {
                username: 'testadmin',
                password: hashedPassword
            }
        });


        // Login admin
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testadmin',
                password: 'testpass123'
            });



        delay(1000);

        authToken = res.body.token;

        // create kendaraan
        let kendaraan = await prisma.kendaraan.create({
            data: {
                plat_nomor: 'B 1234 XX',
                jenis_kendaraan: 'Truck',
                kapasitas: 1000,
                status_kendaraan: 'tersedia'
            }
        });

        kendaraanId = kendaraan.kendaraan_id;

        let supir = await prisma.supir.create({
            data: {
                nama_supir: 'Test Driver',
                no_telepon: '081234567890',
                gambar_supir: 'test.jpg',
                jumlah_antaran: 0,
                status_supir: 'Tersedia',
                password: hashedPassword
            }
        });

        supirId = supir.supir_id;

        let pelanggan = await prisma.pelanggan.create({
            data: {
                nama_pelanggan: 'Test User',
                no_telepon: '081234567890',
                email: 'test@mail.com'
            }
        });

        pelangganId = pelanggan.pelanggan_id;

        // Create barang
        let barang = await prisma.barang.create({
            data: {
                nama_barang: 'Test Item',
                harga: 25000,
                kategori: 'Makanan',
                berat: 500,
            }
        });

        barangId = barang.barang_id;


        // Create test data
        testPengiriman = await prisma.pengiriman.create({
            data: {
                tanggal_pengiriman: new Date(),
                status_pengiriman: 'Belum Dikirim',
                alamat_tujuan: 'Test Address',
                deskripsi: 'Test Description',
                ongkir: 50000,
                total: 150000,
                pembayaran: 'cash',
                resi: 'TEST123',
                kendaraan_id: kendaraanId,
                supir_id: supirId,
                pelanggan_id: pelangganId
            }
        });

    });

    describe('POST /api/pengiriman', () => {
        it('should create new pengiriman', async () => {
            const res = await request(app)
                .post('/api/pengiriman')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    tanggal_pengiriman: new Date(),
                    status_pengiriman: 'Belum Dikirim',
                    alamat_tujuan: 'New Address',
                    deskripsi: 'New Delivery',
                    ongkir: 75000,
                    total: 200000,
                    pembayaran: 'transfer',
                    kendaraan_id: kendaraanId,
                    supir_id: supirId,
                    pelanggan_id: pelangganId
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('Pengiriman berhasil dibuat');
            expect(res.body.data).toHaveProperty('pengiriman_id');
            expect(res.body.data).toHaveProperty('resi');
        });

        it('should validate required fields', async () => {
            const res = await request(app)
                .post('/api/pengiriman')
                .set('Authorization', `Bearer ${authToken}`)
                .send({});

            expect(res.statusCode).toBe(400);
        });
    });

    describe('GET /api/pengiriman', () => {
        it('should get all pengiriman with pagination', async () => {
            const res = await request(app)
                .get('/api/pengiriman')
                .set('Authorization', `Bearer ${authToken}`)
                .query({ page: 1, limit: 10 });

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body.data)).toBeTruthy();
            expect(res.body.meta).toBeDefined();
        });

        it('should filter by status', async () => {
            const res = await request(app)
                .get('/api/pengiriman')
                .set('Authorization', `Bearer ${authToken}`)
                .query({ status_pengiriman: 'Belum Dikirim' });

            expect(res.statusCode).toBe(200);
            expect(res.body.data[0].status_pengiriman).toBe('Belum Dikirim');
        });
    });

    describe('GET /api/pengiriman/stats', () => {
        it('should get pengiriman statistics', async () => {
            const res = await request(app)
                .get('/api/pengiriman/stats')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
    });

    describe('GET /api/pengiriman/minggu-ini', () => {
        it('should get pengiriman statistics for this week', async () => {
            const res = await request(app)
                .get('/api/pengiriman/minggu-ini')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
    });

    describe('GET /api/pengiriman/:id', () => {
        it('should get pengiriman by id', async () => {
            const res = await request(app)
                .get(`/api/pengiriman/${testPengiriman.pengiriman_id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data.pengiriman_id).toBe(testPengiriman.pengiriman_id);
        });

        it('should return 404 for non-existent pengiriman', async () => {
            const res = await request(app)
                .get('/api/pengiriman/999999')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(404);
        });
    });

    describe('POST /api/pengiriman-pelanggan', () => {
        it('should get pengiriman by resi', async () => {
            const res = await request(app)
                .post('/api/pengiriman-pelanggan')
                .send({ resi: 'TEST123' });

            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(res.body.data.resi).toBe('TEST123');
        });

    });

    describe('GET /api/pengiriman/stats', () => {
        it('should get pengiriman statistics', async () => {
            const res = await request(app)
                .get('/api/pengiriman/stats')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.data).toBeDefined();
            expect(Array.isArray(res.body.data)).toBeTruthy();
        });
    });

    describe('PATCH /api/pengiriman/:id', () => {
        it('should update pengiriman status', async () => {
            const res = await request(app)
                .patch(`/api/pengiriman/${testPengiriman.pengiriman_id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status_pengiriman: 'Dalam Pengiriman'
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.status_pengiriman).toBe('Dalam Pengiriman');
        });

        it('should validate update fields', async () => {
            const res = await request(app)
                .patch(`/api/pengiriman/${testPengiriman.pengiriman_id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    status_pengiriman: '', // Empty status
                });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('DELETE /api/pengiriman/:id', () => {
        it('should delete pengiriman', async () => {
            const res = await request(app)
                .delete(`/api/pengiriman/${testPengiriman.pengiriman_id}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('Pengiriman berhasil dihapus');

            // Verify deletion
            const getRes = await request(app)
                .get(`/api/pengiriman/${testPengiriman.pengiriman_id}`)
                .set('Authorization', `Bearer ${authToken}`);
            expect(getRes.statusCode).toBe(404);
        });
    });

    describe('POST /api/detail-pengiriman', () => {
        it('should create a new detail pengiriman', async () => {
            const res = await request(app)
                .post('/api/detail-pengiriman')
                .send({
                    jumlah_barang: 2,
                    pengiriman_id: testPengiriman.pengiriman_id,
                    barang_id: barangId
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe('Detail pengiriman berhasil ditambahkan');
            expect(res.body).toHaveProperty('count');
        });


        it('should validate required fields', async () => {
            const res = await request(app)
                .post('/api/detail-pengiriman')
                .send({});

            expect(res.statusCode).toBe(400);
        });

        it('should validate jumlah_barang as number', async () => {
            const res = await request(app)
                .post('/api/detail-pengiriman')
                .send({
                    jumlah_barang: 'invalid',
                    subtotal: 50000,
                    pengiriman_id: testPengiriman.pengiriman_id,
                    barang_id: barangId
                });
            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe('"jumlah_barang" must be a number');
        });
    });
});
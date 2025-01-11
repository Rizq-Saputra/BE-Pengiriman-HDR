# Dokumentasi API Supir

## Pendahuluan
API Supir digunakan untuk mengelola data supir dalam sistem. API ini mencakup operasi CRUD (Create, Read, Update, Delete) dengan perlindungan autentikasi dan otorisasi untuk memastikan akses hanya oleh pengguna yang berwenang.

---

## 1. Tambah Supir

### Endpoint
**POST** `/supir`

### Headers
- `Authorization`: Bearer {token}

### Body (JSON)
```json
{
  "nama_supir": "string",
  "no_telepon": "string",
  "jumlah_antaran": "integer",
  "status_supir": "string",
  "password": "string",
  "gambar_supir": "string"
}
```

### Response
#### Success (201)
```json
{
  "message": "Supir berhasil ditambahkan",
  "data": {
    "supir_id": 1,
    "nama_supir": "string",
    "no_telepon": "string",
    "jumlah_antaran": "integer",
    "status_supir": "string",
    "gambar_supir": "string"
  }
}
```
#### Error (500)
```json
{
  "message": "Gagal menambahkan supir",
  "error": "string"
}
```

---

## 2. Lihat Semua Supir

### Endpoint
**GET** `/supir`

### Headers
- `Authorization`: Bearer {token}

### Response
#### Success (200)
```json
{
  "message": "Berhasil mendapatkan data supir",
  "data": [
    {
      "supir_id": 1,
      "nama_supir": "string",
      "no_telepon": "string",
      "jumlah_antaran": "integer",
      "status_supir": "string",
      "gambar_supir": "string"
    }
  ]
}
```
#### Error (500)
```json
{
  "message": "Gagal mendapatkan data supir",
  "error": "string"
}
```

---

## 3. Lihat Detail Supir

### Endpoint
**GET** `/supir/:id`

### Headers
- `Authorization`: Bearer {token}

### Response
#### Success (200)
```json
{
  "message": "Berhasil mendapatkan detail supir",
  "data": {
    "supir_id": 1,
    "nama_supir": "string",
    "no_telepon": "string",
    "jumlah_antaran": "integer",
    "status_supir": "string",
    "gambar_supir": "string",
    "Pengiriman": [
      {
        "pengiriman_id": 1,
        "Pelanggan": {
          "pelanggan_id": 1,
          "nama_pelanggan": "string"
        }
      }
    ]
  }
}
```
#### Error (404)
```json
{
  "message": "Supir tidak ditemukan"
}
```
#### Error (500)
```json
{
  "message": "Gagal mendapatkan detail supir",
  "error": "string"
}
```

---

## 4. Ubah Data Supir

### Endpoint
**PATCH** `/supir/:id`

### Headers
- `Authorization`: Bearer {token}
- `Content-Type`: multipart/form-data

### Body (Form Data)
- `nama_supir`: string
- `no_telepon`: string
- `jumlah_antaran`: integer
- `status_supir`: string
- `password`: string (opsional)
- `gambar_supir`: file (opsional)

### Response
#### Success (200)
```json
{
  "message": "Berhasil mengubah data supir",
  "data": {
    "supir_id": 1,
    "nama_supir": "string",
    "no_telepon": "string",
    "jumlah_antaran": "integer",
    "status_supir": "string",
    "gambar_supir": "string"
  }
}
```
#### Error (500)
```json
{
  "message": "Gagal mengubah data supir",
  "error": "string"
}
```

---

## 5. Hapus Supir

### Endpoint
**DELETE** `/supir/:id`

### Headers
- `Authorization`: Bearer {token}

### Response
#### Success (200)
```json
{
  "message": "Supir berhasil dihapus"
}
```
#### Error (500)
```json
{
  "message": "Gagal menghapus supir",
  "error": "string"
}
```

---

## Catatan
- Semua endpoint memerlukan autentikasi dengan token JWT.
- Hanya admin yang diizinkan untuk menambah, mengubah, atau menghapus data supir.
- Supir dapat mengakses detail mereka sendiri melalui endpoint `GET /supir/:id`.


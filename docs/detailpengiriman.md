# Dokumentasi API Detail Pengiriman

## Base URL

`/api/detail-pengiriman`

---

## Endpoints

### 1. Create Detail Pengiriman

**POST** `/api/detail-pengiriman`

#### Request Headers:

- `Content-Type`: `application/json`

#### Request Body:

| Field         | Type    | Required | Description                      |
| ------------- | ------- | -------- | -------------------------------- |
| jumlah_barang | Integer | Yes      | Jumlah dari barang yang dikirim. |
| pengiriman_id | Integer | Yes      | ID dari pengiriman.              |
| barang_id     | Integer | Yes      | ID dari barang.                  |

#### Example Request:

```json
[
  {
    "jumlah_barang": 5,
    "pengiriman_id": 1,
    "barang_id": 10
  },
  {
    "jumlah_barang": 3,
    "pengiriman_id": 1,
    "barang_id": 12
  }
]
```

#### Response:

**201 Created**

```json
{
  "message": "Detail pengiriman berhasil ditambahkan",
  "count": 2
}
```

**500 Internal Server Error**

```json
{
  "message": "Gagal menambahkan detail pengiriman",
  "error": "Error details"
}
```

---

### 2. Get All Detail Pengiriman

**GET** `/api/detail-pengiriman`

#### Description:

Retrieve all `Detail Pengiriman` records.

#### Response:

**200 OK**

```json
{
  "message": "Berhasil mendapatkan data detail pengiriman",
  "data": [
    {
      "detail_pengiriman_id": 1,
      "jumlah_barang": 5,
      "subtotal": 50000,
      "pengiriman": {
        "pengiriman_id": 1,
        "total": 150000
      },
      "barang": {
        "barang_id": 10,
        "nama_barang": "Barang A",
        "harga": 10000
      }
    }
  ]
}
```

**500 Internal Server Error**

```json
{
  "message": "Gagal mendapatkan data detail pengiriman",
  "error": "Error details"
}
```

---

### 3. Get Detail Pengiriman by ID

**GET** `/api/detail-pengiriman/:id`

#### Path Parameters:

| Parameter | Type    | Required | Description                 |
| --------- | ------- | -------- | --------------------------- |
| id        | Integer | Yes      | ID dari `Detail Pengiriman` |

#### Response:

**200 OK**

```json
{
  "message": "Berhasil mendapatkan detail pengiriman",
  "data": {
    "detail_pengiriman_id": 1,
    "jumlah_barang": 5,
    "subtotal": 50000,
    "pengiriman": {
      "pengiriman_id": 1,
      "total": 150000
    },
    "barang": {
      "barang_id": 10,
      "nama_barang": "Barang A",
      "harga": 10000
    }
  }
}
```

**404 Not Found**

```json
{
  "message": "Detail pengiriman tidak ditemukan"
}
```

**500 Internal Server Error**

```json
{
  "message": "Gagal mendapatkan detail pengiriman",
  "error": "Error details"
}
```

---

### 4. Update Detail Pengiriman

**PUT** `/api/detail-pengiriman/:id`

#### Description:

Mengubah `Detail Pengiriman` berdasarkan ID.

#### Path Parameters:

| Parameter | Type    | Required | Description                 |
| --------- | ------- | -------- | --------------------------- |
| id        | Integer | Yes      | ID dari `Detail Pengiriman` |

#### Request Headers:

- `Content-Type`: `application/json`

#### Request Body:

| Field         | Type    | Required | Description                        |
| ------------- | ------- | -------- | ---------------------------------- |
| jumlah_barang | Integer | Yes      | Jumlah barang yang sudah dipesan . |
| pengiriman_id | Integer | Yes      | ID dari pengiriman.                |
| barang_id     | Integer | Yes      | ID dari barang.                    |

#### Example Request:

```json
{
  "jumlah_barang": 10,
  "pengiriman_id": 1,
  "barang_id": 10
}
```

#### Response:

**200 OK**

```json
{
  "message": "Berhasil mengubah data detail pengiriman",
  "data": {
    "detail_pengiriman_id": 1,
    "jumlah_barang": 10,
    "subtotal": 100000,
    "pengiriman_id": 1,
    "barang_id": 10
  }
}
```

**500 Internal Server Error**

```json
{
  "message": "Gagal mengubah data detail pengiriman",
  "error": "Error details"
}
```

---

### 5. Delete Detail Pengiriman

**DELETE** `/api/detail-pengiriman/:id`

#### Description:

Menghapus `Detail Pengiriman` dari ID.

#### Path Parameters:

| Parameter | Type    | Required | Description                 |
| --------- | ------- | -------- | --------------------------- |
| id        | Integer | Yes      | ID dari `Detail Pengiriman` |

#### Response:

**200 OK**

```json
{
  "message": "Detail pengiriman berhasil dihapus"
}
```

**500 Internal Server Error**

```json
{
  "message": "Gagal menghapus detail pengiriman",
  "error": "Error details"
}
```

---

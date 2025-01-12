# Dokumentasi API Barang

## Create Barang

**Endpoint:** `/api/barang`

**Method:** POST

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "nama_barang": "string",
  "kategori": "string",
  "harga": "number"
}
```

**Response Body (Success):**

- **Status Code:** `201`

```json
{
  "message": "Berhasil menambahkan data Barang",
  "data": {
    "barang_id": "number",
    "nama_barang": "string",
    "kategori": "string",
    "harga": "number"
  }
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "error.message"
}
```

## Get All Barang

**Endpoint:** `/api/barang`

**Method:** GET

**Headers:**

- `Content-Type: application/json`

**Query Parameters:**

- `kategori`: (optional) Filter by kategori.
- `q`: (optional) Search by nama_barang.
- `all_data`: (optional) If `true`, returns all data without pagination.
- `page`: (optional) Page number for pagination (default: 1).
- `limit`: (optional) Number of items per page (default: 12).

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Berhasil Mendapatkan data Barang",
  "data": [
    {
      "barang_id": "number",
      "nama_barang": "string",
      "kategori": "string",
      "harga": "number"
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number"
  }
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "error.message"
}
```

## Get Barang by ID

**Endpoint:** `/api/barang/:id`

**Method:** GET

**Headers:**

- `Content-Type: application/json`

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Berhasil Mendapatkan Detail Barang",
  "data": {
    "barang_id": "number",
    "nama_barang": "string",
    "kategori": "string",
    "harga": "number"
  }
}
```

**Response Body (Error):**

- **Status Code:** `404`

```json
{
  "message": "Barang Tidak ditemukan"
}

- **Status Code:** `500`

```json
{
  "message": "error.message"
}
```

## Update Barang

**Endpoint:** `/api/barang/:id`

**Method:** PUT

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "nama_barang": "string",
  "kategori": "string",
  "harga": "number"
}
```

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Berhasil Mengubah Barang",
  "data": {
    "barang_id": "number",
    "nama_barang": "string",
    "kategori": "string",
    "harga": "number"
  }
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "error.message"
}
```

## Delete Barang

**Endpoint:** `/api/barang/:id`

**Method:** DELETE

**Headers:**

- `Content-Type: application/json`

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Barang Berhasil Terhapus"
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "error.message"
}
```


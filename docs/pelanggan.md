# Dokumentasi API Pelanggan

## Create Pelanggan

**Endpoint:** `/api/pelanggan`

**Method:** POST

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "nama_pelanggan": "string",
  "no_telepon": "string",
}
```

**Response Body (Success):**

- **Status Code:** `201`

```json
{
  "message": "Pelanggan berhasil ditambahkan",
  "data": {
    "pelanggan_id": "number",
    "nama_pelanggan": "string",
    "no_telepon": "string",
  }
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "Gagal menambahkan pelanggan",
  "error": "string"
}
```

## Get All Pelanggan

**Endpoint:** `/api/pelanggan`

**Method:** GET

**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer <token>`

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Berhasil mendapatkan data pelanggan",
  "data": [
    {
      "pelanggan_id": "number",
      "nama_pelanggan": "string",
      "no_telepon": "string",
    }
  ]
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "Gagal mendapatkan data pelanggan",
  "error": "string"
}
```

## Get Pelanggan by ID

**Endpoint:** `/api/pelanggan/:id`

**Method:** GET

**Headers:**

- `Content-Type: application/json`

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Berhasil mendapatkan detail pelanggan",
  "data": {
    "pelanggan_id": "number",
    "nama_pelanggan": "string",
    "no_telepon": "string",
  }
}
```

**Response Body (Error):**

- **Status Code:** `404`

```json
{
  "message": "Pelanggan tidak ditemukan"
}
```

- **Status Code:** `500`

```json
{
  "message": "Gagal mendapatkan detail pelanggan",
  "error": "string"
}
```

## Update Pelanggan

**Endpoint:** `/api/pelanggan/:id`

**Method:** PUT

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "nama_pelanggan": "string",
  "no_telepon": "string",
}
```

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Berhasil mengubah data pelanggan",
  "data": {
    "pelanggan_id": "number",
    "nama_pelanggan": "string",
    "no_telepon": "string",
}
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "Gagal mengubah data pelanggan",
  "error": "string"
}
```

## Delete Pelanggan

**Endpoint:** `/api/pelanggan/:id`

**Method:** DELETE

**Headers:**

- `Content-Type: application/json`

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Pelanggan berhasil dihapus"
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "Gagal menghapus pelanggan",
  "error": "string"
}
```


# Dokumentasi API Kendaraan

## Create Kendaraan

**Endpoint:** `/api/kendaraan`

**Method:** POST

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "plat_nomor": "string",
  "jenis_kendaraan": "string",
  "kapasitas": "number",
  "status_kendaraan": "string (optional, default: Tersedia)"
}
```

**Response Body (Success):**

- **Status Code:** `201`

```json
{
  "message": "Kendaraan berhasil ditambahkan",
  "data": {
    "kendaraan_id": "number",
    "plat_nomor": "string",
    "jenis_kendaraan": "string",
    "kapasitas": "number",
    "status_kendaraan": "string"
  }
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "Gagal menambahkan kendaraan",
  "error": "error.message"
}
```

## Get All Kendaraan

**Endpoint:** `/api/kendaraan`

**Method:** GET

**Headers:**

- `Content-Type: application/json`

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Berhasil mendapatkan data kendaraan",
  "data": [
    {
      "kendaraan_id": "number",
      "plat_nomor": "string",
      "jenis_kendaraan": "string",
      "kapasitas": "number",
      "status_kendaraan": "string"
    }
  ]
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "Gagal mendapatkan data kendaraan",
  "error": "error.message"
}
```

## Get Kendaraan by ID

**Endpoint:** `/api/kendaraan/:id`

**Method:** GET

**Headers:**

- `Content-Type: application/json`

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Berhasil mendapatkan detail kendaraan",
  "data": {
    "kendaraan_id": "number",
    "plat_nomor": "string",
    "jenis_kendaraan": "string",
    "kapasitas": "number",
    "status_kendaraan": "string"
  }
}
```

**Response Body (Error):**

- **Status Code:** `404`

```json
{
  "message": "Kendaraan tidak ditemukan"
}

- **Status Code:** `500`

```json
{
  "message": "Gagal mendapatkan detail kendaraan",
  "error": "error.message"
}
```

## Update Kendaraan

**Endpoint:** `/api/kendaraan/:id`

**Method:** PUT

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "plat_nomor": "string",
  "jenis_kendaraan": "string",
  "kapasitas": "number",
  "status_kendaraan": "string (optional, default: Tersedia)"
}
```

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Berhasil mengubah data kendaraan",
  "data": {
    "kendaraan_id": "number",
    "plat_nomor": "string",
    "jenis_kendaraan": "string",
    "kapasitas": "number",
    "status_kendaraan": "string"
  }
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "Gagal mengubah data kendaraan",
  "error": "error.message"
}
```

## Delete Kendaraan

**Endpoint:** `/api/kendaraan/:id`

**Method:** DELETE

**Headers:**

- `Content-Type: application/json`

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Kendaraan berhasil dihapus"
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "message": "Gagal menghapus kendaraan",
  "error": "error.message"
}
```


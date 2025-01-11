# API Documentation for Pengiriman

## Base URL
All endpoints are prefixed with `/pengiriman`.

---

## Authentication
All routes except `exportReportExcel` and `getPengirimanByResi` require a valid token in the header.
- **Header**: `Authorization: Bearer <token>`

---

## Endpoints

### 1. Create Pengiriman
- **Method**: POST
- **Endpoint**: `/pengiriman`
- **Authentication**: Required
- **Validation**: `validatePengiriman`
- **Request Body**:
  ```json
  {
    "resi": "string",
    "pelanggan": "string",
    "alamat": "string",
    "barang": "string",
    "status": "string"
  }
  ```
- **Response**:
  - **201 Created**: Pengiriman created successfully.
  - **400 Bad Request**: Validation errors.
  - **401 Unauthorized**: Invalid token.

---

### 2. Get All Pengiriman
- **Method**: GET
- **Endpoint**: `/pengiriman`
- **Authentication**: Required
- **Response**:
  - **200 OK**: List of pengiriman.
  - **401 Unauthorized**: Invalid token.

---

### 3. Get Pengiriman By ID
- **Method**: GET
- **Endpoint**: `/pengiriman/:id`
- **Authentication**: Required
- **Path Parameters**:
  - `id`: The ID of the pengiriman.
- **Response**:
  - **200 OK**: Pengiriman details.
  - **404 Not Found**: Pengiriman not found.
  - **401 Unauthorized**: Invalid token.

---

### 4. Update Pengiriman
- **Method**: PATCH
- **Endpoint**: `/pengiriman/:id`
- **Authentication**: Required
- **Validation**: `validateUpdatePengiriman`
- **Path Parameters**:
  - `id`: The ID of the pengiriman.
- **Request Body**:
  ```json
  {
    "status": "string"
  }
  ```
- **Response**:
  - **200 OK**: Pengiriman updated successfully.
  - **400 Bad Request**: Validation errors.
  - **404 Not Found**: Pengiriman not found.
  - **401 Unauthorized**: Invalid token.

---

### 5. Delete Pengiriman
- **Method**: DELETE
- **Endpoint**: `/pengiriman/:id`
- **Authentication**: Required
- **Path Parameters**:
  - `id`: The ID of the pengiriman.
- **Response**:
  - **200 OK**: Pengiriman deleted successfully.
  - **404 Not Found**: Pengiriman not found.
  - **401 Unauthorized**: Invalid token.

---

### 6. Export Report to Excel
- **Method**: GET
- **Endpoint**: `/pengiriman/export`
- **Authentication**: Not required
- **Response**:
  - **200 OK**: Excel report generated and returned.

---

### 7. Get Pengiriman Stats
- **Method**: GET
- **Endpoint**: `/pengiriman/stats`
- **Authentication**: Required
- **Response**:
  - **200 OK**: Statistics data.
  - **401 Unauthorized**: Invalid token.

---

### 8. Get Weekly Pengiriman Stats
- **Method**: GET
- **Endpoint**: `/pengiriman/minggu-ini`
- **Authentication**: Required
- **Response**:
  - **200 OK**: Weekly statistics data.
  - **401 Unauthorized**: Invalid token.

---

### 9. Get Pengiriman By Resi
- **Method**: POST
- **Endpoint**: `/pengiriman-pelanggan`
- **Authentication**: Not required
- **Validation**: `validatePengirimanPelanggan`
- **Request Body**:
  ```json
  {
    "resi": "string"
  }
  ```
- **Response**:
  - **200 OK**: Pengiriman details.
  - **400 Bad Request**: Validation errors.

---


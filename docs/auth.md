# Dokumentasi API Autentikasi

## Register

**Endpoint:** `/api/register`

**Method:** POST

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response Body (Success):**

- **Status Code:** `201`

```json
{
  "message": "Pendaftaran pengguna berhasil"
}
```

**Response Body (Error):**

- **Status Code:** `400`

```json
{
  "error": "username dan password wajib diisi"
}

- **Status Code:** `400`

```json
{
  "error": "Pengguna sudah terdaftar"
}

- **Status Code:** `500`

```json
{
  "error": "Terjadi kesalahan saat mendaftarkan pengguna"
}
```

## Login

**Endpoint:** `/api/login`

**Method:** POST

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Login berhasil",
  "token": "string",
  "refreshToken": "string"
}
```

**Response Body (Error):**

- **Status Code:** `400`

```json
{
  "error": "username dan password wajib diisi"
}

- **Status Code:** `400`

```json
{
  "error": "username atau password tidak valid"
}

- **Status Code:** `500`

```json
{
  "error": "Terjadi kesalahan saat login"
}
```

## Refresh Token

**Endpoint:** `/api/refresh-token`

**Method:** POST

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "refreshToken": "string"
}
```

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "token": "string"
}
```

**Response Body (Error):**

- **Status Code:** `400`

```json
{
  "error": "Refresh token wajib diisi"
}

- **Status Code:** `400`

```json
{
  "error": "Refresh token tidak valid"
}

- **Status Code:** `401`

```json
{
  "error": "Refresh token tidak valid atau sudah kadaluarsa"
}
```

## Logout

**Endpoint:** `/api/logout`

**Method:** POST

**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer <token>`

**Request Body:**

```json
{}
```

**Response Body (Success):**

- **Status Code:** `200`

```json
{
  "message": "Logout berhasil"
}
```

**Response Body (Error):**

- **Status Code:** `500`

```json
{
  "error": "Terjadi kesalahan saat logout"
}
```


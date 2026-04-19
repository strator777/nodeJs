# NodeJs API

Backend API sederhana berbasis Node.js, Express, Sequelize, MySQL, JWT, dan Zod.

## Fitur

- Auth register dan login
- Middleware validasi request dengan Zod
- Middleware auth berbasis Bearer token JWT
- Rate limiting dasar dengan `express-rate-limit`
- Struktur folder modular untuk `auth` dan `users`

## Tech Stack

- Node.js
- Express
- Sequelize
- MySQL
- JSON Web Token
- Zod
- Nodemon

## Struktur Proyek

```text
src/
  app.js
  server.js
  config/
  database/
  middlewares/
  modules/
  routes/
  utils/
tests/
```

## Prasyarat

- Node.js 18 atau lebih baru
- MySQL aktif di lokal atau server lain yang bisa diakses
- NPM

## Instalasi

1. Install dependency:

```bash
npm install
```

2. Buat file environment dari template:

```bash
cp .env.example .env
```

3. Sesuaikan nilai di `.env`, terutama:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`

## Environment Variables

Contoh isi file tersedia di [.env.example](/workspaces/nodeJs/.env.example:1).

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_database_password
DB_NAME=nodejs_db
JWT_SECRET=replace-with-a-strong-secret
JWT_EXPIRES_IN=1d
```

## Menjalankan Aplikasi

Mode development:

```bash
npm run dev
```

Mode production:

```bash
npm start
```

Server akan berjalan di:

```text
http://localhost:3000
```

## Endpoint Utama

Base path:

```text
/api
```

Daftar route yang saat ini tersedia:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/profile`
- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

## Catatan Pengembangan

- File `.env` tidak ikut ter-commit karena sudah dimasukkan ke `.gitignore`.
- Template environment aman untuk dibagikan lewat [.env.example](/workspaces/nodeJs/.env.example:1).
- Folder `tests/` sudah tersedia, tetapi test otomatis belum ditambahkan.

## Known Issues

Beberapa bagian proyek masih perlu dirapikan agar siap dipakai penuh:

- Konfigurasi environment di kode belum sepenuhnya sinkron dengan koneksi database.
- Runner migration dan file migration masih perlu dilengkapi.
- Modul `users` masih memakai data in-memory, belum database penuh.
- Error handling masih perlu dirapikan agar status code lebih akurat.

## Saran Lanjutan

Langkah perbaikan berikut yang paling berdampak:

1. Samakan konfigurasi `.env` dengan pembacaan env di layer database dan JWT.
2. Lengkapi migration `users` dan pastikan startup server berhasil.
3. Pindahkan modul `users` dari array in-memory ke database.
4. Tambahkan script test dan test dasar untuk auth serta middleware.

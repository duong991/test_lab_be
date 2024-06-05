# test_lab_be

Đây là dự án backend của ứng dụng Test Lab, được xây dựng bằng NestJs và sử dụng MySQL làm cơ sở dữ liệu. JWT được sử dụng để xác thực người dùng.

## Cài Đặt

1. **Node.js**: Đảm bảo bạn đã cài đặt Node.js phiên bản `>=18.16.1`.

2. **MySQL**: Cần phải cài đặt và cấu hình MySQL trước khi chạy dự án.

3. Clone repository từ GitHub:

```bash
git clone <link-repository>
cd test_lab_be
```

4. Cài đặt các dependencies:

```bash
npm install

```

hoặc

```bash
npm install --force

```

## Cấu hình

1. Tạo một file .env từ file mẫu .env.example.

```bash
cp .env.example .env
```

2. Cấu hình các biến môi trường trong file .env

## Chạy

Chạy ứng dụng:

```bash
npm start
```

## Cách sử dụng

Sau khi chạy, API sẽ được chạy tại http://localhost:3000 mặc định. Bạn có thể truy cập vào các endpoint đã được xác định trong ứng dụng.

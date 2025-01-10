-- Tạo bảng users (Người dùng)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,           -- Mã người dùng
        full_name NVARCHAR(255) NOT NULL,             -- Họ và tên
        email NVARCHAR(255) NOT NULL UNIQUE,          -- Email (unique)
        password NVARCHAR(255) NOT NULL,              -- Mật khẩu (mã hóa trước khi lưu)
        role NVARCHAR(20) CHECK (role IN ('student', 'teacher', 'admin')) NOT NULL, -- Vai trò: học viên, giảng viên, quản trị viên
        phone_number NVARCHAR(20),                    -- Số điện thoại
        date_of_birth DATE,                          -- Ngày sinh
        avatar NVARCHAR(255),                         -- Đường dẫn tới ảnh đại diện (nếu có)
        created_at DATETIME DEFAULT GETDATE() -- Thời gian tạo
    );
END;
GO

-- Tạo bảng courses (Khóa học)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'courses')
BEGIN
    CREATE TABLE courses (
        id INT IDENTITY(1,1) PRIMARY KEY,           -- Mã khóa học
        name NVARCHAR(255) NOT NULL,                  -- Tên khóa học
        description TEXT,                            -- Mô tả về khóa học
        level NVARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')) NOT NULL, -- Cấp độ khóa học
        start_date DATE,                             -- Ngày bắt đầu khóa học
        end_date DATE,                               -- Ngày kết thúc khóa học
        price DECIMAL(10, 2),                        -- Giá khóa học
        created_at DATETIME DEFAULT GETDATE() -- Thời gian tạo
    );
END;
GO

-- Tạo bảng course_teachers (Liên kết giảng viên với khóa học)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'course_teachers')
BEGIN
    CREATE TABLE course_teachers (
        course_id INT,                               -- Mã khóa học (liên kết với bảng courses)
        teacher_id INT,                              -- Mã giảng viên (liên kết với bảng users)
        PRIMARY KEY (course_id, teacher_id),         -- Khóa chính kết hợp
        FOREIGN KEY (course_id) REFERENCES courses(id), -- Liên kết với bảng courses
        FOREIGN KEY (teacher_id) REFERENCES users(id) -- Liên kết với bảng users
    );
END;
GO

-- Tạo bảng categories (Danh mục bài viết)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'categories')
BEGIN
    CREATE TABLE categories (
        id INT IDENTITY(1,1) PRIMARY KEY,           -- Mã danh mục
        name NVARCHAR(255) NOT NULL UNIQUE           -- Tên danh mục (chính sách du học, hệ thống trường...)
    );
END;
GO

-- Tạo bảng articles (Bài viết)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'articles')
BEGIN
    CREATE TABLE articles (
        id INT IDENTITY(1,1) PRIMARY KEY,           -- Mã bài viết
        title NVARCHAR(255) NOT NULL,                 -- Tiêu đề bài viết
        content TEXT NOT NULL,                       -- Nội dung bài viết
        author_id INT,                               -- Mã người viết (liên kết với bảng users)
        category_id INT,                             -- Mã danh mục (liên kết với bảng categories)
        image_url NVARCHAR(255),                      -- Đường dẫn ảnh đại diện
        published_at DATETIME DEFAULT GETDATE(), -- Thời gian xuất bản
        updated_at DATETIME DEFAULT GETDATE(), -- Thời gian cập nhật
        status NVARCHAR(20) CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft', -- Trạng thái bài viết
        FOREIGN KEY (author_id) REFERENCES users(id), -- Liên kết với bảng users
        FOREIGN KEY (category_id) REFERENCES categories(id) -- Liên kết với bảng categories
    );
END;
GO

-- Tạo bảng enrollments (Đăng ký khóa học của học viên)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'enrollments')
BEGIN
    CREATE TABLE enrollments (
        student_id INT,                            -- Mã học viên (liên kết với bảng users)
        course_id INT,                              -- Mã khóa học (liên kết với bảng courses)
        enrolled_at DATETIME DEFAULT GETDATE(),    -- Thời gian đăng ký
        PRIMARY KEY (student_id, course_id),        -- Khóa chính kết hợp
        FOREIGN KEY (student_id) REFERENCES users(id), -- Liên kết với bảng users (học viên)
        FOREIGN KEY (course_id) REFERENCES courses(id) -- Liên kết với bảng courses (khóa học)
    );
END;
GO

-- Tạo bảng intro_content (Nội dung giới thiệu)
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'intro_content')
BEGIN
    CREATE TABLE intro_content (
        id INT IDENTITY(1,1) PRIMARY KEY,           -- Mã nội dung giới thiệu
        content TEXT NOT NULL,                      -- Nội dung giới thiệu
        created_at DATETIME DEFAULT GETDATE(),      -- Thời gian tạo
        updated_at DATETIME DEFAULT GETDATE()       -- Thời gian cập nhật
    );
END;
GO

-- Chèn dữ liệu vào bảng intro_content

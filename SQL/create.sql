--create database db_videosharingapp
--use db_videosharingapp

-- Tạo bảng Users
CREATE TABLE Users (
    idUser INT IDENTITY(1,1) PRIMARY KEY,      -- Tự động tăng
    username NVARCHAR(100) NOT NULL,            -- Tên người dùng
    sdt NVARCHAR(15),                          -- Số điện thoại
    birthDay DATE,                              -- Ngày sinh
    avatar NVARCHAR(255),                       -- Đường dẫn ảnh đại diện
    email NVARCHAR(255) NOT NULL                -- Email
);

-- Tạo bảng Account
CREATE TABLE Account (
    idAccount INT IDENTITY(1,1) PRIMARY KEY,   -- Tự động tăng
    idUser INT NOT NULL,                        -- Khóa ngoại từ bảng Users
    username NVARCHAR(100) NOT NULL,            -- Tên người dùng
    pass NVARCHAR(255) NOT NULL,                -- Mật khẩu
    CONSTRAINT FK_Account_User FOREIGN KEY (idUser) REFERENCES Users(idUser)
);

-- Tạo bảng Follow
CREATE TABLE Follow (
    id_following INT NOT NULL,                  -- id người dùng theo dõi
    id_followed INT NOT NULL,                   -- id người dùng bị theo dõi
    CONSTRAINT PK_Follow PRIMARY KEY (id_following, id_followed), 
    CONSTRAINT FK_Follow_Following FOREIGN KEY (id_following) REFERENCES Users(idUser),
    CONSTRAINT FK_Follow_Followed FOREIGN KEY (id_followed) REFERENCES Users(idUser)
);

-- Tạo bảng Post
CREATE TABLE Post (
    idPost INT IDENTITY(1,1) PRIMARY KEY,      -- Tự động tăng
    idUser INT NOT NULL,                       -- id người dùng tạo bài đăng
    type NVARCHAR(50),                         -- Loại bài đăng (video, image, story)
    url NVARCHAR(255),                         -- Đường dẫn media (video, ảnh...)
    content NVARCHAR(1000),                    -- Nội dung bài đăng
    upload_at DATETIME,                        -- Thời gian đăng
    CONSTRAINT FK_Post_User FOREIGN KEY (idUser) REFERENCES Users(idUser)
);

-- Tạo bảng Like
CREATE TABLE [Like] (
    idLike INT IDENTITY(1,1) PRIMARY KEY,     -- Tự động tăng
    idUser INT NOT NULL,                       -- id người dùng thích bài đăng
    idPost INT NOT NULL,                       -- id bài đăng
    CONSTRAINT FK_Like_User FOREIGN KEY (idUser) REFERENCES Users(idUser),
    CONSTRAINT FK_Like_Post FOREIGN KEY (idPost) REFERENCES Post(idPost)
);

-- Tạo bảng Comment
CREATE TABLE Comment (
    idComment INT IDENTITY(1,1) PRIMARY KEY,  -- Tự động tăng
    idPost INT NOT NULL,                       -- id bài đăng
    idUser INT NOT NULL,                       -- id người dùng bình luận
    text NVARCHAR(1000),                       -- Nội dung bình luận
    time DATETIME,                             -- Thời gian bình luận
    CONSTRAINT FK_Comment_User FOREIGN KEY (idUser) REFERENCES Users(idUser),
    CONSTRAINT FK_Comment_Post FOREIGN KEY (idPost) REFERENCES Post(idPost)
);

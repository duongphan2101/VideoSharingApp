INSERT INTO Users (username, sdt, birthDay, avatar, email)
VALUES 
('Alice', '0901234567', '1995-08-15', 'https://imgur.com/RrBwvfA.png', 'alice@example.com'),
('Bob', '0912345678', '1992-12-20', 'https://imgur.com/RrBwvfA.png', 'bob@example.com'),
('Charlie', '0923456789', '1990-06-25', 'https://imgur.com/RrBwvfA.png', 'charlie@example.com');

INSERT INTO Account (idUser, username, pass)
VALUES
(1, 'Alice', '123'),
(2, 'Bob', '123'),
(3, 'Charlie', '123');

INSERT INTO Follow (id_following, id_followed)
VALUES
(1, 2),  -- Alice theo dõi Bob
(1, 3),  -- Alice theo dõi Charlie
(2, 1),  -- Bob theo dõi Alice
(3, 1);  -- Charlie theo dõi Alice

--INSERT INTO Post (idUser, type, url, content, upload_at, count_like, count_comment)
--VALUES
--(1, 'image', 'https://example.com/images/post1.jpg', 'Alice first post', '2024-11-08 08:00', 10, 3),
--(2, 'video', 'https://example.com/videos/post2.mp4', 'Bob cool video', '2024-11-08 09:00', 20, 5),
--(3, 'story', 'https://example.com/stories/post3.jpg', 'Charlie story', '2024-11-08 10:00', 15, 4);

--INSERT INTO [Like] (idUser, idPost)
--VALUES
--(1, 2),  -- Alice thích bài đăng của Bob
--(2, 1),  -- Bob thích bài đăng của Alice
--(3, 2),  -- Charlie thích bài đăng của Bob
--(1, 3),  -- Alice thích bài đăng của Charlie
--(2, 3);  -- Bob thích bài đăng của Charlie

--INSERT INTO Comment (idPost, idUser, text, time)
--VALUES
--(1, 2, 'Nice post, Alice!', '2024-11-08 08:10'),
--(1, 3, 'I agree, this is cool!', '2024-11-08 08:15'),
--(2, 1, 'Great video, Bob!', '2024-11-08 09:05'),
--(2, 3, 'Very funny, I love it!', '2024-11-08 09:10'),
--(3, 1, 'I love this story, Charlie!', '2024-11-08 10:05');


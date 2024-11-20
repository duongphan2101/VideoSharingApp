const express = require('express');
const mssql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình kết nối với MSSQL
const config = {
  user: 'sa',
  password: '123',
  server: 'localhost',
  database: 'db_videosharingapp',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};


// Kết nối MSSQL
mssql.connect(config)
  .then(pool => {
    console.log('Connected to MSSQL');
    app.locals.db = pool;
  })
  .catch(err => {
    console.log('Failed to connect to MSSQL', err);
  });

// API Endpoint để lấy danh sách người dùng
app.get('/account', async (req, res) => {
  try {
    const pool = req.app.locals.db;
    const result = await pool.request().query(`SELECT u.*,a.username as account_user, 
      a.pass FROM Account a inner join  Users u on a.idUser = u.idUser`);
    res.json(result.recordset); // Trả về dữ liệu
  } catch (err) {
    console.log('Error fetching Accounts from MSSQL:', err);
    res.status(500).send('Server Error');
  }
});


app.get('/data', async (req, res) => {
  let id = parseInt(req.query.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID parameter. Must be a number." });
  }
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query(`select * from Users where idUser= @id`);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching followed:', err);
    res.status(500).send('Server Error');
  }
});

// API Endpoint để lấy danh sách follow
app.get('/follow', async (req, res) => {
  let id = parseInt(req.query.id, 10); // Parse id to an integer
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID parameter. Must be a number." });
  }
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query(`
        SELECT 
          SUM(CASE WHEN f.id_following = @id THEN 1 ELSE 0 END) AS following_count,
          SUM(CASE WHEN f.id_followed = @id THEN 1 ELSE 0 END) AS followers_count
        FROM Follow f;
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching follow counts:', err);
    res.status(500).send('Server Error');
  }
});

// API Endpoint để lấy danh sách người đang theo dõi người dùng (followed)
app.get('/followed', async (req, res) => {
  let id = parseInt(req.query.id, 10); // Lấy id người dùng
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID parameter. Must be a number." });
  }
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query(`
        SELECT f.id_following, u.*
        FROM Follow f
        INNER JOIN Users u ON u.idUser = f.id_following
        WHERE f.id_followed = @id
      `);  // Lấy danh sách những người đang theo dõi người dùng có id = @id
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching followed:', err);
    res.status(500).send('Server Error');
  }
});

// API Endpoint để lấy danh sách người mà người dùng đang theo dõi (following)
app.get('/following', async (req, res) => {
  let id = parseInt(req.query.id, 10); // Lấy id người dùng
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID parameter. Must be a number." });
  }
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query(`
        SELECT f.id_followed, u.*
        FROM Follow f
        INNER JOIN Users u ON u.idUser = f.id_followed
        WHERE f.id_following = @id
      `);  // Lấy danh sách những người mà người dùng đang theo dõi
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching following:', err);
    res.status(500).send('Server Error');
  }
});


// Same fix applied to other routes
app.get('/profilevideos', async (req, res) => {
  let id = parseInt(req.query.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID parameter. Must be a number." });
  }
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query(`
        SELECT p.url, p.idPost, u.idUser, u.avatar FROM Post p INNER JOIN Users u
        ON p.idUser = u.idUser WHERE p.type= 'video' AND p.idUser = @id
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching profile videos:', err);
    res.status(500).send('Server Error');
  }
});

// endpoint lay danh sach anh profile
app.get('/profileimages', async (req, res) => {
  let id = parseInt(req.query.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID parameter. Must be a number." });
  }
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query(`
        SELECT p.url, p.idPost, u.idUser, u.avatar FROM Post p INNER JOIN Users u
        ON p.idUser = u.idUser WHERE p.type= 'image' AND p.idUser = @id
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching profile videos:', err);
    res.status(500).send('Server Error');
  }
});

app.get('/videoStreaming', async (req, res) => {
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .query(`
        SELECT * FROM Post p 
        INNER JOIN Users u ON p.idUser = u.idUser
        where p.type = 'video'
        ORDER BY p.idPost DESC;
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching video details:', err);
    res.status(500).send('Server Error');
  }
});

app.get('/imageStreaming4', async (req, res) => {
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .query(`
        SELECT top 4 * FROM Post p 
        INNER JOIN Users u ON p.idUser = u.idUser
        where p.type = 'image'
        ORDER BY p.idPost DESC;
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching video details:', err);
    res.status(500).send('Server Error');
  }
});

app.get('/imageStreaming', async (req, res) => {
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .query(`
        SELECT * FROM Post p 
        INNER JOIN Users u ON p.idUser = u.idUser
        where p.type = 'image'
        ORDER BY p.idPost DESC;
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching video details:', err);
    res.status(500).send('Server Error');
  }
});


// API Endpoint để lấy danh sách video in profile
app.get('/profilevideos', async (req, res) => {
  const { id } = req.query;
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query(`
        select p.url from Post p inner join Users u
        on p.idUser = u.idUser where p.type= 'video' and p.idUser = @id
        ORDER BY p.idPost DESC;
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching follow counts:', err);
    res.status(500).send('Server Error');
  }
});

// API Endpoint để lấy danh sách videoDetails
app.get('/videoDetails', async (req, res) => {
  const { id } = req.query;
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query(`select * from Post where idPost = @id`);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching follow counts:', err);
    res.status(500).send('Server Error');
  }
});

// API Endpoint để lấy danh sách comment cua 1 video
app.get('/comment', async (req, res) => {
  const { id } = req.query;
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return res.status(400).send('Invalid id parameter');
  }

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, parsedId)
      .query(`
        select c.text, c.time, u.avatar, u.username
        from Comment c
        inner join Post p on c.idPost = p.idPost 
        inner join Users u on u.idUser = c.idUser
        where p.idPost = @id ORDER BY p.idPost DESC
      `);

    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching comments:', err);
    res.status(500).send('Server Error');
  }
});

// API Endpoint để lấy số lượng comment cua 1 video
app.get('/commentCount', async (req, res) => {
  const { id } = req.query;
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return res.status(400).send('Invalid id parameter');
  }

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, parsedId)
      .query(`
        SELECT COUNT(*) AS comment_count FROM Comment WHERE idPost = @id
      `);

    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching comments:', err);
    res.status(500).send('Server Error');
  }
});

// API Endpoint để lấy số lượng Like cua 1 video
app.get('/likeCount', async (req, res) => {
  const { id } = req.query;
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return res.status(400).send('Invalid id parameter');
  }

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, parsedId)
      .query(`
        		SELECT COUNT(*) AS like_count FROM [Like] WHERE idPost = @id;
      `);

    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching comments:', err);
    res.status(500).send('Server Error');
  }
});

// Endpoint để lưu bài viết mới
app.post('/savePost', async (req, res) => {
  const { idUser, type, url, content } = req.body;
  if (!idUser || !type || !url || !content) {
    return res.status(400).json({ error: 'Vui lòng cung cấp idUser, type, url và content.' });
  }

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('idUser', mssql.Int, idUser)
      .input('type', mssql.NVarChar, type)
      .input('url', mssql.NVarChar, url)
      .input('content', mssql.NVarChar, content)
      .query(`
        INSERT INTO dbo.Post (idUser, type, url, content, upload_at)
        VALUES (@idUser, @type, @url, @content, GETDATE())
      `);

    res.status(201).json({ message: 'Bài viết đã được lưu thành công!' });
  } catch (error) {
    console.error("Lỗi cơ sở dữ liệu:", error);
    res.status(500).json({ error: 'Lỗi khi lưu bài viết vào cơ sở dữ liệu.' });
  }
});

// Update Profile Endpoint
app.put('/updateProfile', async (req, res) => {
  const { idUser, username, avatar, sdt, email, birthDay } = req.body;

  if (!idUser || !username || !sdt || !email || !birthDay) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const pool = req.app.locals.db;

    const query = `
      UPDATE [Users]
      SET 
        username = @username,
        avatar = @avatar,
        sdt = @sdt,
        email = @email,
        birthDay = @birthDay
      WHERE idUser = @idUser
    `;

    const result = await pool.request()
      .input('idUser', mssql.Int, idUser)
      .input('username', mssql.NVarChar, username)
      .input('avatar', mssql.NVarChar, avatar)
      .input('sdt', mssql.NVarChar, sdt)
      .input('email', mssql.NVarChar, email)
      .input('birthDay', mssql.DateTime, new Date(birthDay))
      .query(query);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint để lưu bài viết mới
app.post('/insertComment', async (req, res) => {
  const { idPost, idUser, text } = req.body;

  if (!idUser || !idPost || !text) {
    return res.status(400).json({ error: 'Vui lòng cung cấp idUser, idPost và text.' });
  }

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('idUser', mssql.Int, idUser)
      .input('idPost', mssql.Int, idPost)
      .input('text', mssql.NVarChar, text)
      .query(`
        INSERT INTO dbo.Comment (idUser, idPost, text, time)
        VALUES (@idUser, @idPost, @text, GETDATE())
      `);

    res.status(201).json({ message: 'Bình luận thành công!' });
  } catch (error) {
    console.error("Lỗi cơ sở dữ liệu:", error);
    res.status(500).json({ error: 'Lỗi khi thêm bình luận vào cơ sở dữ liệu.' });
  }
});

// Endpoint để tao account end user
app.post('/register', async (req, res) => {
  const { username, sdt, email, accname, pass } = req.body;
  const avatar = "https://imgur.com/a/QdlMMTF.png";
  if (!username || !sdt || !email || !accname || !pass) {
    return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin' });
  }

  try {
    const pool = req.app.locals.db;
    const transaction = new mssql.Transaction(pool);
    await transaction.begin();

    const request = transaction.request();
    const resultUser = await request
      .input('username', mssql.NVarChar, username)
      .input('sdt', mssql.NVarChar, sdt)
      .input('email', mssql.NVarChar, email + "@gmail.com")
      .input('avatar', mssql.NVarChar, avatar)
      .query(`
        INSERT INTO Users (username, sdt, email, avatar, birthDay)
        OUTPUT inserted.idUser
        VALUES (@username, @sdt, @email, @avatar, GETDATE())
      `);

    const idUser = resultUser.recordset[0].idUser;
    await request
      .input('idUser', mssql.Int, idUser)
      .input('accname', mssql.NVarChar, accname)
      .input('pass', mssql.NVarChar, pass)
      .query(`
        INSERT INTO Account (idUser, username, pass)
        VALUES (@idUser, @accname, @pass)
      `);
    await transaction.commit();

    res.status(201).json({ message: 'Tạo tài khoản thành công!' });
  } catch (error) {
    console.error("Lỗi cơ sở dữ liệu:", error);

    try {
      if (transaction) await transaction.rollback();
    } catch (rollbackError) {
      console.error("Lỗi rollback:", rollbackError);
    }

    res.status(500).json({ error: 'Lỗi khi tạo tài khoản.' });
  }
});

app.get('/is-following', async (req, res) => {
  const { id_following, id_followed } = req.query;

  // Kiểm tra đầu vào
  if (!id_following || !id_followed) {
    return res.status(400).json({ error: 'Thiếu id_following hoặc id_followed' });
  }

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id_following', mssql.Int, parseInt(id_following))
      .input('id_followed', mssql.Int, parseInt(id_followed))
      .query(`
        SELECT COUNT(*) AS is_following
        FROM Follow
        WHERE id_following = @id_following AND id_followed = @id_followed;
      `);

    // Lấy giá trị is_following (0 hoặc 1)
    const isFollowing = result.recordset[0].is_following > 0;

    res.status(200).json({ isFollowing });
  } catch (error) {
    console.error("Lỗi kiểm tra follow:", error);
    res.status(500).json({ error: 'Lỗi khi kiểm tra trạng thái follow.' });
  }
});

// Endpoint để theo dõi người dùng
app.post('/follow', async (req, res) => {
  const { idFollowing, idFollowed } = req.body;
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('idFollowing', mssql.Int, parseInt(idFollowing))
      .input('idFollowed', mssql.Int, parseInt(idFollowed))
      .query(`
              INSERT INTO Follow (id_following, id_followed)
              VALUES (@idFollowing, @idFollowed)
          `);
    res.status(200).json({ message: 'Đã theo dõi người dùng thành công' });
  } catch (error) {
    console.error("Lỗi khi theo dõi:", error);
    res.status(500).json({ error: 'Lỗi khi theo dõi người dùng.' });
  }
});

// Endpoint để hủy theo dõi người dùng
app.delete('/unfollow', async (req, res) => {
  const { idFollowing, idFollowed } = req.body;
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('idFollowing', mssql.Int, parseInt(idFollowing))
      .input('idFollowed', mssql.Int, parseInt(idFollowed))
      .query(`
              DELETE FROM Follow
              WHERE id_following = @idFollowing AND id_followed = @idFollowed
          `);
    res.status(200).json({ message: 'Đã hủy theo dõi người dùng thành công' });
  } catch (error) {
    console.error("Lỗi khi hủy theo dõi:", error);
    res.status(500).json({ error: 'Lỗi khi hủy theo dõi người dùng.' });
  }
});

app.get('/is-like', async (req, res) => {
  const { idPost, idUser } = req.query;

  // Kiểm tra đầu vào
  if (!idPost || !idUser) {
    return res.status(400).json({ error: 'Thiếu idPost hoặc idUser' });
  }

  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('idPost', mssql.Int, parseInt(idPost))
      .input('idUser', mssql.Int, parseInt(idUser))
      .query(`
        SELECT COUNT(*) AS is_like
        FROM [Like]
        WHERE idPost = @idPost AND idUser = @idUser;
      `);

    // Lấy giá trị is_Like (0 hoặc 1)
    const is_Like = result.recordset[0].is_Like > 0;

    res.status(200).json({ is_Like });
  } catch (error) {
    console.error("Lỗi kiểm tra Like:", error);
    res.status(500).json({ error: 'Lỗi khi kiểm tra trạng thái Like.' });
  }
});

app.post('/like', async (req, res) => {
  const { idUser, idPost } = req.body;
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('idUser', mssql.Int, idUser)
      .input('idPost', mssql.Int, idPost)
      .query(`INSERT INTO [Like] (idUser, idPost) VALUES (@idUser, @idPost)`);

    res.status(200).send({ message: "Liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).send("Server error");
  }
});

app.post('/unlike', async (req, res) => {
  const { idUser, idPost } = req.body;
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('idUser', mssql.Int, idUser)
      .input('idPost', mssql.Int, idPost)
      .query(`DELETE FROM [Like] WHERE idUser = @idUser AND idPost = @idPost`);

    res.status(200).send({ message: "Unliked successfully" });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).send("Server error");
  }
});

app.get('/stories', async (req, res) => {
  try {
    const pool = req.app.locals.db;
    const result = await pool.query(
      `SELECT p.*, u.avatar, u.username FROM Post p
      inner join Users u on p.idUser = u.idUser
       WHERE type = 'story' AND DATEDIFF(HOUR, upload_at, GETDATE()) <= 24
       ORDER BY p.idPost DESC`
    );
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send('Error fetching stories');
  }
});

app.get('/Userstories', async (req, res) => {
  try {
    const pool = req.app.locals.db;
    const result = await pool.query(
      `SELECT u.idUser, u.avatar, u.username,MAX(p.upload_at) AS latest_upload_at FROM Post p 
INNER JOIN Users u ON p.idUser = u.idUser
WHERE p.type = 'story' AND DATEDIFF(HOUR, p.upload_at, GETDATE()) <= 24
GROUP BY u.idUser, u.avatar, u.username ORDER BY latest_upload_at DESC;`
    );
    res.status(200).json(result.recordset);
  } catch (err) {
    res.status(500).send('Error fetching stories');
  }
});


// Khởi chạy server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

const express = require('express');
const mssql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình kết nối với MSSQL
const config = {
  user: 'sa',         // Tên người dùng
  password: '123',     // Mật khẩu
  server: 'localhost', // Máy chủ SQL
  database: 'db_videosharingapp', // Tên cơ sở dữ liệu
  options: {
    encrypt: true, // Đảm bảo mã hóa kết nối
    trustServerCertificate: true // Dùng nếu không sử dụng chứng chỉ
  }
};

// Kết nối MSSQL
mssql.connect(config)
  .then(pool => {
    console.log('Connected to MSSQL');
    // Đảm bảo connection pool sẵn sàng
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

// API Endpoint để lấy danh sách da~ follow
app.get('/followed', async (req, res) => {
  let id = parseInt(req.query.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID parameter. Must be a number." });
  }
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query(`
        select f.id_following, u.* from Follow f
        inner join Users u on u.idUser=f.id_following
        where f.id_followed = @id
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching followed:', err);
    res.status(500).send('Server Error');
  }
});

// API Endpoint để lấy danh sách da~ following
app.get('/following', async (req, res) => {
  let id = parseInt(req.query.id, 10); // Parse id to an integer
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID parameter. Must be a number." });
  }
  try {
    const pool = req.app.locals.db;
    const result = await pool.request()
      .input('id', mssql.Int, id)
      .query(`
        select f.id_following, u.* from Follow f
        inner join Users u on u.idUser=f.id_following
        where f.id_followed = @id
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching followed:', err);
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
        where p.idPost = @id
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
  const count_like = 0;
  const count_comment = 0;
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
      .input('count_like', mssql.Int, count_like)
      .input('count_comment', mssql.Int, count_comment)
      .query(`
        INSERT INTO dbo.Post (idUser, type, url, content, upload_at, count_like, count_comment)
        VALUES (@idUser, @type, @url, @content, GETDATE(), @count_like, @count_comment)
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


// Khởi chạy server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

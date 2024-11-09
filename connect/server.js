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
    const result = await pool.request().query('SELECT u.*, a.pass FROM Account a inner join' + ' Users u on a.idUser = u.idUser');
    res.json(result.recordset); // Trả về dữ liệu
  } catch (err) {
    console.log('Error fetching Accounts from MSSQL:', err);
    res.status(500).send('Server Error');
  }
});

// API Endpoint để lấy danh sách follow
app.get('/follow', async (req, res) => {
  const { id } = req.query;  // Lấy id từ query parameters, thay vì req.body
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
    res.json(result.recordset); // Trả về dữ liệu
  } catch (err) {
    console.log('Error fetching follow counts:', err);
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
      `);
    res.json(result.recordset);
  } catch (err) {
    console.log('Error fetching follow counts:', err);
    res.status(500).send('Server Error');
  }
});


// Khởi chạy server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

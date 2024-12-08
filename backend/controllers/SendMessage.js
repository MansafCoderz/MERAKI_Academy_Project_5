const { pool } = require("../models/db");

const messageHandler = (socket) => {
  socket.on("message", async (data) => {
    const query = `INSERT INTO messages(sender,receiver,message_text)
  VALUES ($1,$2,$3) RETURNING*`;
    const values = [data.from, data.to, data.message];
    try {
      const result = await pool.query(query, values);

      const message_id = result.rows[0].message_id;

      const created_at = result.rows[0].created_at;

      const sendResult = await pool.query(
        `SELECT profile_image FROM users where user_id=$1`,
        [data.from]
      );

      const profile_image = sendResult.rows[0].profile_image;

      socket.to(`room-${data.to}`).emit("message", {
        message_id,
        message_text: data.message,
        sender: data.from,
        created_at,
        profile_image,
      });
      socket.emit("message", {
        message_id,
        message_text: data.message,
        sender: data.from,
        created_at,
        profile_image,
      });
    } catch (error) {
      console.error(error);
    }
  });
};

const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  const query = `SELECT m.message_text,m.sender,u.profile_image,m.message_id ,m.created_at FROM messages m
  join users u on m.sender=u.user_id
  where (m.sender=$1 AND  m.receiver=$2 ) OR
  ( m.sender=$2 AND m.receiver=$1)
  ORDER BY m.created_at ASC
  `;
  const values = [senderId, receiverId];
  try {
    const result = await pool.query(query, values);
    res.status(200).json({
      success: true,
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error.message,
    });
  }
};

module.exports = {
  getMessages,
  messageHandler,
};



const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;


app.use(express.json());


async function task(user_id) {
  const logEntry = `${user_id}-task completed at-${new Date().toISOString()}\n`;
  fs.appendFileSync('task_log.txt', logEntry);
  console.log(`Task for ${user_id} completed`);
}


app.post('/task', (req, res) => {
  const { user_id } = req.body;
  

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

 
  task(user_id)
    .then(() => {
      res.status(200).json({ message: "Task accepted and completed" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error processing task", error });
    });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

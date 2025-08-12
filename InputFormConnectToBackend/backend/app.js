import fs from 'node:fs/promises';

import express from 'express';

async function loadOpinions() {
  try {
    const dbFileData = await fs.readFile('./db.json');
    const parsedData = JSON.parse(dbFileData);
    return parsedData.opinions;
  } catch (error) {
    return [];
  }
}

async function saveOpinion(opinion) {
  const opinions = await loadOpinions();
  const newOpinion = { id: new Date().getTime(), votes: 0, ...opinion };
  opinions.unshift(newOpinion);
  const dataToSave = { opinions };
  await fs.writeFile('./db.json', JSON.stringify(dataToSave, null, 2));
  return newOpinion;
}

async function upvoteOpinion(id) {
  const opinions = await loadOpinions();
  const opinion = opinions.find((o) => o.id === id);
  if (!opinion) {
    return null;
  }
  opinion.votes++;
  await fs.writeFile('./db.json', JSON.stringify({ opinions }, null, 2));
  return opinion;
}

async function downvoteOpinion(id) {
  const opinions = await loadOpinions();
  const opinion = opinions.find((o) => o.id === id);
  if (!opinion) {
    return null;
  }
  opinion.votes--;
  await fs.writeFile('./db.json', JSON.stringify({ opinions }, null, 2));
  return opinion;
}

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.get('/opinions', async (req, res) => {
  try {
    const opinions = await loadOpinions();
    res.json(opinions);
  } catch (error) {
    res.status(500).json({ error: 'Error loading opinions.' });
  }
});

app.post('/opinions', async (req, res) => {
  const { userName, title, body } = req.body;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!userName || !title || !body) {
    return res
      .status(400)
      .json({ error: 'User name, title and opinion body are required.' });
  }
  try {
    const newOpinion = await saveOpinion({ userName, title, body });
    res.status(201).json(newOpinion);
  } catch (error) {
    res.status(500).json({ error: 'Error saving opinion.' });
  }
});

app.post('/opinions/:id/upvote', async (req, res) => {
  const { id } = req.params;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const opinion = await upvoteOpinion(Number(id));
    if (!opinion) {
      return res.status(404).json({ error: 'Opinion not found.' });
    }
    res.json(opinion);
  } catch (error) {
    res.status(500).json({ error: 'Error upvoting opinion.' });
  }
});
// :id 是一个 路由参数 (Route Parameter) 占位符。
// Express 会自动把 URL 里 /opinions/5/upvote 里的 5 抓出来，并放到 req.params.id 里（id）。
// 如果 URL 是 /opinions/5/upvote，这里 id 的值就是字符串 "5"。
// 你这里用了 Number(id)，是为了转成数字方便数据库查询。
// 执行upvoteOpinion() function，通过id找到要找的data



app.post('/opinions/:id/downvote', async (req, res) => {
  const { id } = req.params;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
    const opinion = await downvoteOpinion(Number(id));
    if (!opinion) {
      return res.status(404).json({ error: 'Opinion not found.' });
    }
    res.json(opinion);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error downvoting opinion.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

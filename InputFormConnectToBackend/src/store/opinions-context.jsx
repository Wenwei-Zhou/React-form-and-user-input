import { createContext, useEffect, useState } from 'react';

export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();

  // 初始化时（一开始运行时）获取数据
  // 组件一挂载就执行 loadOpinions()。
  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch('http://localhost:3000/opinions'); // 发送 GET 请求 到 http://localhost:3000/opinions。
      const opinions = await response.json(); // 创立json文件
      setOpinions(opinions); // 拿到 JSON 数据后用 setOpinions() 存到 state → 这样 UI 就能显示来自 backend 的数据。
    }

    loadOpinions();
  }, []);

  async function addOpinion(enteredOpinionData) {
    const response = await fetch('http://localhost:3000/opinions', {
      method: 'POST', // 指定 HTTP 请求方法为 POST
      headers: {
        'Content-Type': 'application/json', // 告诉服务器这是 JSON 数据
      },
      body: JSON.stringify(enteredOpinionData), // 把对象转换成 JSON 字符串发送
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }
  // addOpinion function在其它component当需要时执行出来，参数enteredOpinionData就是数据
  // 调用 fetch 发送 POST 请求，把 enteredOpinionData（数据） 发到 backend。
  // backend 保存后返回保存好的数据（带 id 等）。
  // 用 setOpinions() 把新数据加到 UI 上（不用重新 GET 全部数据，因为已经有了返回的新数据）。



  async function upvoteOpinion(id) {
    const response = await fetch('http://localhost:3000/opinions/' + id + '/upvote', {
      method: 'POST',
    });
    // opinion 的 id。这会触发一个请求（request）

    if (!response.ok) {
      return;
    }

    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes + 1 };
        }
        return opinion;
      });
    });
  }

  async function downvoteOpinion(id) {
    const response = await fetch('http://localhost:3000/opinions/' + id + '/downvote', {
      method: 'POST',
    });

    if (!response.ok) {
      return;
    }

    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes - 1 };
        }
        return opinion;
      });
    });
  }

  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}


// fetch 是 JavaScript 原生提供的 HTTP 请求 API，用来向服务器发送请求并获取响应。它常用于从后端获取数据（GET）、向后端提交数据（POST、PUT、DELETE 等）。


// body 部分是通过 JSON.stringify() 把 JavaScript 对象（enteredOpinionData）转成了 JSON 格式的文本。
// header 的 Content-Type 告诉服务器——这是 application/json 类型的数据，不是普通文本或表单数据。
// 这样，服务器才能正确地用 JSON 解析器去读取它（比如在 Node.js 里用 express.json()）。
// 如果你不加 Content-Type: application/json，有些服务器会把它当作 text/plain 或 application/x-www-form-urlencoded，导致解析失败或得到 null。
// [浏览器 JS 代码]
//      |
//      | fetch() 发起请求
//      |-----------------------
//      |  Method: POST
//      |  Headers: Content-Type: application/json
//      |  Body: { "name": "Tom", "age": 25 }  ← JSON.stringify 转成字符串
//      |
// [网络传输 HTTP 请求]
//      |
// [服务器接收到请求]
//      |
//      | 读取 Headers → 看到 Content-Type: application/json
//      | 知道要用 JSON 解析方式
//      |
// [服务器 JSON 解析器]
//      |
//      v
// 得到对象 { name: "Tom", age: 25 }

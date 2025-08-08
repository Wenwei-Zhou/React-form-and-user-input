import { useRef, useState } from "react";

export default function Login() {

  const [emailIsInvalid, setEmailIsInvalid] = useState();

  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    // event.preventDefault()是阻止表单的默认提交行为
    // 自己用 fetch/axios 发送 HTTP 请求

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    console.log(enteredEmail, enteredPassword);

    const emailIsInvalid = !enteredEmail.includes('@');

    if (!emailIsInvalid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);

    console.log('Sending HTTP request...');
  }

  // 通过在这里设置ref属性, 连接将在这个DOM元素之间建立, 所以这里的输入元素和这个ref｡
  // 需要访问ref对象的current属性, 因为这个current属性将保存实际连接的值｡ 这里的输入对象值是电子邮件和密码｡ 然后, 由于值将是存储在这里的输入DOM元素对象, 因此您可以访问该对象的值属性, 因为每个输入DOM元素对象都将具有这样的值属性｡
  // 这种方法的缺点是, 以一种干净的方式重置这些值有点困难, 因为实际上不鼓励您使用引用来操作DOM｡ 因此, 像这样重新设置它们会起作用,


  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email" 
            name="email"
            ref={email}
          />
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid error address.</p>}</div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password"
            name="password"
            ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">
          Login
        </button>
        {/* <button className="button" type = "submit">Login</button> */}
        {/* 另一种方法，加type = "submit" */}
      </p>
    </form>
  );
}

// HTML 最初的设计目标，HTML 最初设计是为了创建静态网页，但也支持和服务器交互，比如用户注册、登录、搜索等操作。而表单（<form>）就是用于收集用户输入数据并提交到服务器的主要方式。

// 全栈架构中这是必要的，在传统的全栈 Web 应用中（比如使用 PHP、Java、ASP.NET 的网站）：每个页面都由服务器生成并发送给浏览器。表单提交之后，服务器处理数据（如写入数据库）并返回一个新的 HTML 页面。所以“提交表单回服务器”是标准流程。

// 为什么在 React 或前端框架中要阻止这个行为。React 是单页面应用（SPA），页面不应该因为表单提交而刷新。
// 这是因为我们希望：表单提交仍然通过 HTTP 与服务器通信，但我们控制这个过程。用户体验更好：无刷新、表单验证、动态反馈等。
import { useState } from "react";

export default function StateLogin() {

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes('@');
  // 当didEdit.email = ture，说明用户编辑了 email 字段并且 email 不包含 '@' 时，emailIsInvalid 为 true，然后显示错误信息

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
    // event.preventDefault()是阻止表单的默认提交行为
    // 自己用 fetch/axios 发送 HTTP 请求
  }

  function handleInputChange(identitfier, event) {
    setEnteredValues(prevValues =>({
      ...prevValues,
      [identitfier]: event.target.value 
      // 这是动态更新对象属性的方式，可以包含不同的value
      // 这里的 identitfier 可以是 'email' 或 'password'
    }))
      // identifier = 'email';
      // event.target.value = 'abc@example.com';
      // => { email: 'abc@example.com' }

      // identifier = 'password';
      // event.target.value = '123456';
      // => { email: 'abc@example.com', password: '123456' }

    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identitfier]: false
      // 这里的 identifier 可以是 'email' 或 'password'
      // 这会将对应的 didEdit 状态设置为 false
      // 例如，如果 identifier 是 'email'，则 didEdit.email 会被设置为 false
      // 例如：如果用户正在输入框中输入内容，那么 didEdit.email 会变为 false，didEdit.email是false，那错误信息就不再显示了
    }))
  }

  function handleInputBlur(identifier) {
    setDidEdit(prevEdit => ({
      ...prevEdit,
      [identifier]: true
      // 这里的 identifier 可以是 'email' 或 'password'
      // 这会将对应的 didEdit 状态设置为 true
      // 例如，如果 identifier 是 'email'，则 didEdit.email 会被设置为 true
      // 这样可以跟踪哪个输入字段已经被编辑过
      // 这对于表单验证或用户体验很有用
      // 例如：如果用户在输入框失去焦点时触发了 handleInputBlur('email')，那么 didEdit.email 会变为 true
      // 这样可以在渲染时根据 didEdit.email 的值来决定是否显示错误消息或其他提示
    }))
  }

  // function handleEmailChange(event) {
  //   setEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setPassword(event.target.value);
  // }
  // 这个是最初用的方法，但很麻烦！！！

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
            onBlur={() => handleInputBlur('email')}
            onChange={(event) => handleInputChange('email', event)}
            value={enteredValues.email}
          />
          <div className="control-error">{emailIsInvalid && <p>Please enter a valid email address.</p>}</div>

        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password"
            name="password"
            onChange={(event) => handleInputChange ('password', event)}
            value={enteredValues.password}
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




// 什么是 onBlur？
// onBlur 会在 元素失去焦点时触发（也就是说，当用户点击/跳出这个输入框时触发）。

// 常用于：表单验证、保存草稿、触发 API 请求 等。


// 事件	      什么时候触发function()	   常用于
// -------------------------------------------------------------
// onChange	 用户每次输入时	             实时表单更新、输入验证
// onBlur	   用户离开输入框时	           延迟验证、节省资源、展示错误信息

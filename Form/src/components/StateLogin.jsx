import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

export default function StateLogin() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError
  } = useInput('', (value) => hasMinLength(value, 6))

  // const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email) && !isNotEmpty(enteredValues.email);
  // 当didEdit.email = ture，说明用户编辑了 email 字段并且 email 不包含 '@' 和input不为空时，emailIsInvalid 为 true，然后显示错误信息

  // const passwordIsInvalid = didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleSubmit(event) {
    event.preventDefault();
    // event.preventDefault()是阻止表单的默认提交行为
    // 自己用 fetch/axios 发送 HTTP 请求

    if (emailHasError || passwordHasError) {
      return;
    }

    console.log(emailValue, passwordValue);
  }

  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input 
          label="Email" 
          id="email" 
          type="email" 
          name="email"
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          value={emailValue}
          error={emailHasError && "Please enter a valid email address."}
        />
        <Input 
          label="Password" 
          id="password" 
          type="password" 
          name="password"
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
          value={passwordValue}
          error={passwordHasError && "Please enter a valid password."}
        />
        </div>

        

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
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

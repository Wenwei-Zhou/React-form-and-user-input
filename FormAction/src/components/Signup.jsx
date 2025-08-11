import { useActionState } from "react";
import {
  isEmail,
  isNotEmpty,
  isEqualToOtherValue,
  hasMinLength,
} from "../util/validation.js";

function signupAction(preventDefault, formData) {
    // prevState → 上一次的 state
    // formData  → 这次表单提交生成的 FormData 对象

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");
    const firstName = formData.get("first-name");
    const LastName = formData.get("last-name");
    const role = formData.get("role");
    const terms = formData.get("terms");
    const acquisitionChannel = formData.getAll("acquisition");
    // 通过formData  → 这次表单提交生成的 FormData 对象，去获取这次输入的value

    let errors = [];

    if (!isEmail(email)) {
      errors.push("Invalid email address.");
    }

    if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
      errors.push("You must provide a password with at least six characters.");
    }

    if (!isEqualToOtherValue(password, confirmPassword)) {
      errors.push("Passwords do not match.");
    }

    if (!isNotEmpty(firstName) || !isNotEmpty(LastName)) {
      errors.push("Please provide both your first and last name.");
    }

    if (!isNotEmpty(role)) {
      errors.push("Please select a role");
    }

    if (!terms) {
      errors.push("You must agree to the terms and conditions.");
    }

    if (acquisitionChannel.length === 0) {
      errors.push("Please select at least one acquistion channel");
    }

    if (errors.length > 0) {
      return {
        errors: errors,
        enteredValues: {
          email,
          password,
          confirmPassword,
          firstName,
          LastName,
          role,
          acquisitionChannel,
          terms,
          // 这些是输入的value，每点击一次submit button，这些value都会通过input输入的更新一次
        },
      };
    }

    return { errors: null };
  }

export default function Signup() {

  const [formState, formAction] = useActionState(signupAction, {
    errors: null,
  });

  return (
    // <form action> 里的 action 属性，就是用来告诉浏览器：“这个表单提交的时候，要把数据发到哪个 URL（地址）去处理。”
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          defaultValue={formState.enteredValues?.email}
        />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            defaultValue={formState.enteredValues?.password}
          />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            defaultValue={formState.enteredValues?.firstName}
          />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={formState.enteredValues?.LastName}
          />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select
          id="role"
          name="role"
          defaultValue={formState.enteredValues?.role}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "google"
            )}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "friend"
            )}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="other"
            name="acquisition"
            value="other"
            defaultChecked={formState.enteredValues?.acquisitionChannel.includes(
              "other"
            )}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            defaultChecked={formState.enteredValues?.terms}
          />
          I agree to the terms and conditions
        </label>
      </div>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
      {/* signupAction()里面的let errors=[]，储存的input errors在这里通过map()呈现出来 */}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        {/* type="reset", 用来把表单里的所有字段值恢复到它们的初始值 */}
        <button className="button">Sign up</button>
        {/* 在 <form> 里，不写 type 默认就是 submit */}
      </p>
    </form>
  );
}

// 只有触发 <form> 的提交事件（submit） 才会执行你绑定在 action 上的 signupAction 函数。！！！！！！！！！！！！！！！

// 作用：当用户提交表单时（比如点击 <button type="submit">），浏览器会自动创建一个 HTTP 请求，把表单里的数据发送到 action 指定的地址。这个地址通常是你后端服务器的一个接口（URL）。
// 如果不写 action，默认会提交到当前页面的 URL。

// useActionState:
// state → 表单的当前状态（action 函数的返回值）
// action → 用在 <form action={action}> 或 <button formAction={action}> 上
// useActionState第一个参数signupAction() Function → 处理表单提交的函数（可以是异步的）。输入input后，通过创建的function去处理这些input输入的value
// useActionState第二个参数initialState → 表单状态的初始值


// signupAction functin 第二个参数的作用，就是接收 浏览器在表单提交时帮你打包好的数据，它是一个 FormData 对象。FormData是当React 调用你的 signupAction 时，会自动帮你拿到 <form> 里所有带 name 属性的字段，并塞到这个对象里。


// defaultValue={formState.enteredValues?.email}，当submit表单但是有不符合条件也就是errors时表单会要求重新填写同时把input变回空的，但如果加了defaultValue，就会在把input变回空的同时，保存输入的value，让user根据errors去自己改input value
// formState.enteredValues 里存储的是用户上一次提交时的输入数据。
// ?（可选链）保证当 enteredValues 是 undefined 时不会报错，而是返回 undefined。
// 所以如果用户上次输入过 email，它会被当成表单初始值显示出来；如果没有，就保持空。
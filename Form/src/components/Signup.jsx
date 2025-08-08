import { useState } from "react";

export default function Signup() {

    const [passwordAreNotEqual, setPasswordAreNotEqual] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const acquisitionChannel = fd.getAll('acquisition');
        const data = Object.fromEntries(fd.entries());

        data.acquisition = acquisitionChannel;
        console.log(data);

        if (data.password !== data['confirm-password']) {
            setPasswordAreNotEqual(true);
            return;
            
        }

        event.target.reset(); // Reset the form after submission，重置form里面的所有input元素的值

        // FormData这行代码从提交的 <form> 元素中提取所有表单字段。
        // event.target 是那个 <form> 元素（前提是这个代码在 onSubmit 的事件处理函数中）。

        // fd.entries() 返回的是一个迭代器（每个项是 [key, value] 的形式）。
        // Object.fromEntries(...) 可以将这种形式的键值对集合转成一个普通对象。

        // Example:
        // <input id="email" type="email" name="email" />
        // <input id="password" type="password" name="password" />
        // Output: { email: "wen@example.com", password: "123456" }

        // getAll() 是一个 FormData 对象的方法，主要用于获取具有相同 name 的所有表单字段值。
        // 例如：当你有多个同名字段时（比如复选框），多个复选框的 name 都叫 'acquisition'，
        // getAll('acquisition') 会返回一个数组，包含所有选中的复选框的值。


    }
  return (
    <form onSubmit={handleSubmit}>
    {/* React 中用于监听表单提交事件 */}

      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required minLength={6} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          <div className="control-error">
            {passwordAreNotEqual && <p>Passwords mo=ust match.</p>}
          </div>
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
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
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" required />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
import { useFormStatus } from "react-dom";

export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? 'Submitting...' : 'Submit'}
      </button>
    </p>
  );
}

// useFormStatus钩子｡ 这个钩子实际上不能在包含表单和formAction的组件中使用｡ 所以我们不能在这个组件中使用它
// 要创建一个component，然后再把component在NewOpinion component里面执行

// useFormStatus 是 React 19 中专门为表单状态设计的一个 Hook，主要用来 追踪表单的提交状态（比如是否正在提交中），从而帮你在 UI 上做加载动画或者禁用按钮等交互反馈。

// 作用解释：
// useFormStatus 会告诉你当前表单是否处于“提交中”状态。
// 当用户点击提交后，直到 action 处理完毕之前，pending 会是 true。
// 这样你就能根据状态来禁用按钮、显示加载指示器、避免重复提交。

// 在pending的时候可以加上关于pending的动画


// [用户还没提交表单]
//         |
// useFormStatus.pending === false
//         |
//    用户点击提交按钮 (type="submit")
//         |
// 表单开始提交 ————> useFormStatus.pending === true
//         |
//   action 函数执行中（异步等待）
//         |
// action 执行完成，返回结果
//         |
// 表单提交结束 ————> useFormStatus.pending === false
//         |
// UI 根据状态更新（按钮启用，隐藏加载提示）

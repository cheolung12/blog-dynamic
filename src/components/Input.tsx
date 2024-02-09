import { cn } from "@/utils/style";
import { ComponentPropsWithoutRef, forwardRef } from "react";

// 주어진 컴포넌트 타입의 모든 props를 추출하되, ref 속성을 제외한 타입을 생성
// ref를 직접적으로 컴포넌트의 prop으로 처리하지 않을 때 사용
type InputProps = ComponentPropsWithoutRef<"input">;

// forwardRef는 React 컴포넌트가 부모 컴포넌트로부터 받은 ref를 자신의 하위 DOM 요소나 다른 컴포넌트로 전달할 수 있게 해주는 함수이다. 
// 일반적으로, 컴포넌트는 props를 통해 데이터와 콜백 함수를 자식 컴포넌트로 전달할 수 있지만, ref는 props처럼 직접 전달할 수 없습니다. forwardRef를 사용하면 이러한 제한을 우회할 수 있다.
const Input = forwardRef<HTMLInputElement, InputProps>(  // forwardRef의 두 가지 유형의 매개변수를 받는데 하나는 참조할 ref의 dom 타입, 하나는 해당 요소의 props를 받는다.
  // props들과  ref를 인자로 받는다.
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        {...rest}
        className={cn(
          "rounded-md border border-gray-300 p-2 transition-all hover:border-gray-400",
        )}
      />
    );
  },
);

export default Input;

// 컴포넌트의 displayName을 input으로 설정 (디버깅용)
Input.displayName = "Input";

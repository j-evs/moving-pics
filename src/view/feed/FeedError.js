import * as React from "react";
import { Toast, KIND } from "baseui/toast";
import { useStyletron } from "baseui";

export default ({ children }) => {
  const [css] = useStyletron();

  return (
    <div className={css({ position: "fixed", bottom: 0, right: "20px" })}>
      <Toast
        overrides={{
          ToastInnerContainer: {
            style: ({ $theme }) => {
              return {
                backgroundColor: "black"
              };
            }
          },
          ToastBody: {
            style: ({ $theme }) => {
              return {
                backgroundColor: "black"
              };
            }
          },
          Root: {
            style: ({ $theme }) => {
              return {
                backgroundColor: "black"
              };
            }
          }
        }}
        kind={KIND.negative}
      >
        {children}
      </Toast>
    </div>
  );
};

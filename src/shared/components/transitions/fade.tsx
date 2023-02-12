import React from "react";
import { useRef } from "react";

import { Transition, TransitionStatus } from "react-transition-group";

interface Props {
  duration: number;
  children?: React.ReactNode;
  isVisible: boolean;
}

const defaultStyle = (duration: number) => ({
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
});

type TransitionStyle = {
  entering: React.CSSProperties;
  entered: React.CSSProperties;
  exiting: React.CSSProperties;
  exited: React.CSSProperties;
};

const transitionStyles: TransitionStyle = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const getStylesByTransitionState = (
  state: TransitionStatus
): React.CSSProperties => {
  return ((transitionStyles as any)[state] ?? {}) as React.CSSProperties;
};
export default function Fade(props: Props) {
  const nodeRef = useRef(null);

  return (
    <Transition nodeRef={nodeRef} in={props.isVisible} timeout={props.duration}>
      {(state) => (
        <div
          ref={nodeRef}
          style={{
            ...defaultStyle(props.duration),
            ...getStylesByTransitionState(state),
          }}
        >
          {state === "exited" || state === "unmounted" ? null : props.children}
        </div>
      )}
    </Transition>
  );
}

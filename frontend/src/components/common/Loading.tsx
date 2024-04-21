import React, { type ReactElement } from "react";

interface LoadingProps {
  height?: string | number;
  width?: string | number;
  backgroundColor?: string;
  fontSize?: string;
  text?: string;
  fullScreen?: boolean;
  isLoading?: boolean;
}

function Loading({
  height = "50px",
  width = "50px",
  backgroundColor = "transparent",
  fontSize = "1rem",
  text = "Loading",
  fullScreen = false,
  isLoading = true,
}: LoadingProps): ReactElement {
  return (
    <div
      style={{
        display: isLoading ? "flex" : "none",
        position: `${fullScreen ? "absolute" : "static"}`,
        top: `${fullScreen ? "0" : ""}`,
        left: `${fullScreen ? "0" : ""}`,
        height: `${fullScreen ? "100vh" : ""}`,
        background: `${backgroundColor}`,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: "auto", shapeRendering: "auto" }}
        width={width}
        height={height}
        viewBox="0 0 100 100"
      >
        <linearGradient
          id="linear_gradient_spinner"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#a3ff84" />
          <stop offset="100%" stopColor="#0f0" />
        </linearGradient>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          // stroke="currentColor"
          stroke="url(#linear_gradient_spinner)"
          strokeWidth={10}
          strokeDasharray="165 100"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1.5s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
        <text
          x="50%"
          y="50%"
          fontWeight={600}
          fontSize={fontSize}
          textAnchor="middle"
          stroke="none"
          fill="#d1d5db"
          dy=".3em"
        >
          {/* {text} */}
        </text>
      </svg>
    </div>
  );
}

export default Loading;
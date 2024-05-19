import React, { useEffect, type ReactElement } from 'react'

interface Props {
  isActive: boolean | null;
}

function ErrorAnimation({ isActive }: Props ): ReactElement {

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes stroke {
        100% { stroke-dashoffset: 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const styles = {
    stroke: 'rgb(220 38 38)',
    strokeDasharray: 48,
    strokeDashoffset: 48,
    transformOrigin: '50% 50% 0',
    animation: '0.5s ease 0.5s normal forwards 1 running stroke'
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 52 52'
      strokeWidth={4}
    >
      <path 
        fill="none"
        d="M16,16 l20,20" 
        style={{
          stroke: 'rgb(220 38 38)',
          strokeDasharray: 48,
          strokeDashoffset: 48,
          transformOrigin: '50% 50% 0',
          animation: '0.5s ease 0.2s normal forwards 1 running stroke'
        }} 
      />
      <path
        fill="none"
        d="M16,36 l20,-20"
        style={{
          stroke: 'rgb(220 38 38)',
          strokeDasharray: 48,
          strokeDashoffset: 48,
          transformOrigin: '50% 50% 0',
          animation: '0.5s ease 0.3s normal forwards 1 running stroke'
        }} 
      />
    </svg>
  );
}

export default ErrorAnimation;
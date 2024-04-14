import { type SVGProps, type ReactElement } from "react"

export const PlayIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 200 200" strokeWidth={1.5} height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="100" cy="100" r="90" strokeWidth={10} fill="none" />
      {/* <polygon points="107.5,97.5 107.5,127.5 137.5,112.5" fill="black" /> smaller */} 
      <polygon points="85,70 85,130 145,100" strokeLinejoin="round" transform="translate(-10, 0)" />
    </svg>
  )
}

export const PauseIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 200 200" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="100" cy="100" r="90" strokeWidth={10} fill="none" />
      <rect x="75" y="66.66" width="20" height="60" stroke="none" />
      <rect x="105" y="66.66" width="20" height="60" stroke="none" />
    </svg>
  )
}

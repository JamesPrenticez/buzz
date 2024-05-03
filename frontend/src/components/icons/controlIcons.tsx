import { type SVGProps, type ReactElement } from "react"

export const PlayIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 200 200" strokeWidth={1.5} height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" {...props} className="scale-[125%]">
      {/* <circle cx="100" cy="100" r="90" strokeWidth={10} fill="none" /> */}
      {/* <polygon points="107.5,97.5 107.5,127.5 137.5,112.5" fill="black" /> smaller */} 
      <polygon points="85,70 85,130 145,100" strokeLinejoin="round" transform="translate(-10, 0)" />
    </svg>
  )
}

export const PauseIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 200 200" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" className="scale-[125%]" {...props}>
      {/* <circle cx="100" cy="100" r="90" strokeWidth={10} fill="none" /> */}
      <rect x="75" y="66.66" width="20" height="60" stroke="none" />
      <rect x="105" y="66.66" width="20" height="60" stroke="none" />
    </svg>
  )
}

export const ResetIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 200 200" height="50%" width="50%" strokeWidth={2} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path 
        d=" M 49.89 46.91 C 64.68 32.53 85.33 24.26 105.99 24.89 C 125.67 25.13 145.24 32.83 159.54 46.41 C 173.21 59.41 182.06 77.26 184.50 95.93 C 185.85 110.19 183.64 124.80 177.81 137.90 C 167.48 161.28 145.32 179.09 120.10 183.60 C 114.59 184.52 108.81 181.13 106.85 175.92 C 104.51 170.50 106.56 163.67 111.51 160.45 C 114.92 158.19 119.19 158.11 122.91 156.59 C 133.86 152.43 143.85 145.12 150.14 135.13 C 158.45 122.58 161.55 106.58 157.83 91.93 C 154.03 76.27 142.84 62.68 128.33 55.73 C 117.07 50.22 103.90 48.96 91.73 51.78 C 80.48 54.55 70.51 61.27 62.93 69.93 C 69.29 70.01 75.66 69.88 82.02 69.98 C 85.43 69.73 88.58 72.71 88.55 76.12 C 88.65 79.37 88.69 82.62 88.52 85.87 C 88.34 89.08 85.25 91.69 82.08 91.56 C 64.70 91.60 47.32 91.60 29.95 91.55 C 26.46 91.68 23.34 88.52 23.56 85.02 C 23.55 67.69 23.50 50.35 23.59 33.02 C 23.49 29.98 25.96 27.09 29.00 26.80 C 32.33 26.56 35.68 26.65 39.02 26.72 C 42.37 26.66 45.32 29.71 45.21 33.05 C 45.32 38.86 45.14 44.68 45.29 50.49 C 46.97 49.49 48.52 48.31 49.89 46.91 Z" />
    </svg>
  )
}

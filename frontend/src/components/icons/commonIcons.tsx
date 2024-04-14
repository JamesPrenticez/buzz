import { type SVGProps, type ReactElement } from "react"

export const CrossIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  )
}

export const InfoIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" strokeWidth="1.5" fill="currentColor" {...props}>
      <path d=" M 88.53 12.79 C 106.36 10.49 124.91 13.74 140.82 22.15 C 157.86 31.07 171.83 45.74 179.85 63.23 C 189.56 83.85 190.43 108.29 182.71 129.69 C 176.13 148.10 163.18 164.14 146.60 174.50 C 131.49 184.05 113.40 188.82 95.55 187.77 C 77.60 186.91 59.98 180.33 45.85 169.22 C 30.12 156.96 18.72 139.20 14.28 119.74 C 9.77 100.18 12.23 79.08 21.16 61.10 C 33.78 35.16 59.86 16.31 88.53 12.79 M 97.35 40.59 C 89.52 43.07 84.75 52.16 87.13 60.02 C 89.17 68.10 98.24 73.51 106.31 71.21 C 114.94 69.17 120.43 59.14 117.43 50.78 C 114.97 42.65 105.41 37.53 97.35 40.59 M 74.31 79.39 C 72.06 79.85 70.61 82.74 72.16 84.64 C 74.79 87.30 78.82 87.08 82.23 87.84 C 85.04 88.85 85.13 92.37 84.85 94.86 C 82.42 110.60 79.10 126.21 77.13 142.02 C 76.18 150.74 83.44 158.73 91.91 159.81 C 100.50 160.80 109.92 160.29 117.27 155.23 C 120.12 153.18 123.07 150.96 124.88 147.90 C 125.99 146.02 124.47 142.73 122.05 143.48 C 119.02 144.36 116.68 146.78 113.56 147.44 C 111.38 148.03 108.62 147.94 107.13 145.99 C 105.11 143.17 105.59 139.43 106.14 136.21 C 108.58 122.05 111.27 107.93 113.87 93.80 C 114.55 89.84 116.03 85.56 114.21 81.69 C 113.39 79.68 111.14 78.81 109.09 78.91 C 99.71 78.88 90.33 78.84 80.95 78.83 C 78.73 78.87 76.45 78.74 74.31 79.39 Z" />
    </svg>
  )
}

export const ArrowRightToLine = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" stroke-lineJoin="round" fill="none" stroke="currentColor"  {...props}>
      <path d="M17 12H3"/><path d="m11 18 6-6-6-6"/><path d="M21 5v14"/>
    </svg>
  )
}
export const SignOutIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" stroke-lineJoin="round" fill="none" stroke="currentColor" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  )
}

export const SignInIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" {...props}>
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
      <polyline points="10 17 15 12 10 7"/>
      <line x1="15" x2="3" y1="12" y2="12"/>
    </svg>
  )
}

export const PlusCircleIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 12h8"/>
      <path d="M12 8v8"/>
    </svg>
  )
}

export const PlusIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" {...props}>
      <path d="M8 12h8"/>
      <path d="M12 8v8"/>
    </svg>
  )
}

export const TickIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" {...props}>
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  )
}

export const XIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" fill="none" stroke="currentColor" {...props}>
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  )
}

export const EyeOpenIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
}
export const EyeClosedIcon = (props: SVGProps<SVGSVGElement>): ReactElement => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
      <line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
  )
}

module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  media: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xm: ['.75rem', '1rem'], // font size, line height
      sm: ['.875rem', '1.25rem'],
      base: ['1rem', '1.5rem'],
      lg: ['1.125rem', '1.65rem'],
      xl: ['1.25rem', '1.75rem'],
      "2xl": ['1.4rem', '2rem'],
      "3xl": ['1.875rem', '2.25rem'],
      "4xl": ['2.25rem', '2.75rem'],
      "5xl": ['3rem', '3.5rem'],
      "6xl": ['3.75rem', '4.25rem'],
      "7xl": ['4.5rem', '5.2rem'],
    },
    extend:{
      backgroundColor: {
        primary: "#101010",
        muted: "#212121",
        ghost: "#303030",
        secondary: "#fff",
        "secondary-muted": "#d1d5db",
        major: "#00FF00",
        minor: "#7c3aed",
        sage: "#a3ff84",
        mist: "#90a299",
        tarantula: "#111815",
        night: " #16221a",
        shadow: "#1c281f",
        fern: "#1f422d",
        moss: "#2d422d ",
      },
      textColor: {
        primary: "#fff",
        muted: "#d1d5db",
        secondary: "#101010",
        disabled: "#666",
        major: "#00FF00",
        sage: "#a3ff84",
        mist: "#90a299",
        tarantula: "#111815",
        night: " #16221a",
        shadow: "#1c281f",
        fern: "#1f422d",
        moss: "#2d422d ",
      },
      borderColor: {
        primary: "#101010",
        muted: "#212121",
        ghost: "#303030",
        major: "#00FF00",
        minor: "#7c3aed",
        secondary: "#fff",
        "secondary-muted": "#fff",
        sage: "#a3ff84",
        mist: "#90a299",
        tarantula: "#111815",
        night: " #16221a",
        shadow: "#1c281f",
        fern: "#1f422d",
        moss: "#2d422d ",
      },
      ringColor: {
        primary: "#fff",
        muted: "#d1d5db",
        ghost: "#666",
        major: "#00FF00",
        minor: "#7c3aed",
        sage: "#a3ff84",
        mist: "#90a299",
        tarantula: "#111815",
        night: " #16221a",
        shadow: "#1c281f",
        fern: "#1f422d",
        moss: "#2d422d ",
      },
      gradientColorStops: {
        major: "#00FF00",
        minor: "#7c3aed",
        sage: "#a3ff84",
        mist: "#90a299",
        tarantula: "#111815",
        night: " #16221a",
        shadow: "#1c281f",
        fern: "#1f422d",
        moss: "#2d422d ",
      },
      height: {
        "screen-5rem": "calc(100vh - 5rem)",
        "screen-4rem": "calc(100vh - 4rem)",
      },
			minHeight:{
        "screen-5rem": "calc(100vh - 5rem)",
        "screen-4rem": "calc(100vh - 4rem)",
      },
			fontFamily: {
        'sans': ['Arial']
      },
      gridTemplateColumns: {
        'todos': '1fr repeat(7, 32px)',
      },
      colors:{
        theme: {
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          tertiary: "var(--tertiary)",
          quaternary: "var(--quaternary)",
          quinary: "var(--quinary)",
          senary: "var(--senary)",
          septenary: "var(--septenary)",
          octonary: "var(--octonary)",
        }
      },
      animation: {
        jump: 'jump 1s ease-in-out 1',
        wiggle: 'wiggle 1s ease-in-out infinite',
        flash: 'flash 1s ease-in-out 1',
      },
      keyframes: {
        jump:{
          '16.65%': { transform: 'translateY(8rem)' }, /* 8px */
          '33.3%': { transform: 'translateY(-6rem)' },  /* -6px */
          '49.95%': { transform: 'translateY(4rem)' }, /* 4px */
          '66.6%': { transform: 'translateY(-2rem)' },  /* -2px */
          '83.25%': { transform: 'translateY(1rem)' },  /* 1px */
          '100%': { transform: 'translateY(0)' },  /* 0px */
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },     
        flash: {
          from: { backgroundColor: 'rgb(34 197 94)' },
          to: { backgroundColor: 'rgb(239 68 68)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
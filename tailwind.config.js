import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			brand: {
  				'pastel-green': '#A8D5BA',
  				'grey-green-light': '#8BB18F',
  				'grey-green': '#3A6B4E',
  				white: '#FAFAFA',
  				'dark-grey': '#333333'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			heading: [
  				'Sora',
  				'sans-serif'
  			],
  			display: [
  				'The Season',
  				'serif'
  			],
  			editorial: [
  				'Playfair Display',
  				'serif'
  			],
  			subheading: [
  				'Montserrat',
  				'sans-serif'
  			],
  			body: [
  				'Lora',
  				'serif'
  			],
  			accent: [
  				'Arapey',
  				'serif'
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'spin-slow': 'spin 3s linear infinite',
  			'pulse-slow': 'pulse 3s ease-in-out infinite',
  			float: 'float 6s ease-in-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			// Air purifier specific animations
  			'air-particle': 'air-particle 8s ease-in-out infinite',
  			'air-flow': 'air-flow 4s ease-in-out infinite',
  			'breathe': 'breathe 4s ease-in-out infinite',
  			'clean-air': 'clean-air 6s ease-in-out infinite',
  			'filter-rotate': 'filter-rotate 10s linear infinite',
  			'wellness-pulse': 'wellness-pulse 3s ease-in-out infinite',
			'circle-outline': 'circle-outline 2s linear infinite'
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			// Air purifier specific keyframes
  			'air-particle': {
  				'0%, 100%': {
  					transform: 'translateY(0px) translateX(0px) scale(1)',
  					opacity: '0.6'
  				},
  				'25%': {
  					transform: 'translateY(-30px) translateX(10px) scale(1.1)',
  					opacity: '0.8'
  				},
  				'50%': {
  					transform: 'translateY(-60px) translateX(-5px) scale(0.9)',
  					opacity: '1'
  				},
  				'75%': {
  					transform: 'translateY(-45px) translateX(-15px) scale(1.05)',
  					opacity: '0.7'
  				}
  			},
  			'air-flow': {
  				'0%': {
  					transform: 'translateX(-100%)',
  					opacity: '0'
  				},
  				'50%': {
  					opacity: '0.8'
  				},
  				'100%': {
  					transform: 'translateX(100%)',
  					opacity: '0'
  				}
  			},
  			'breathe': {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					opacity: '0.7'
  				},
  				'50%': {
  					transform: 'scale(1.05)',
  					opacity: '1'
  				}
  			},
  			'clean-air': {
  				'0%': {
  					background: 'rgba(168, 213, 186, 0.1)'
  				},
  				'50%': {
  					background: 'rgba(168, 213, 186, 0.3)'
  				},
  				'100%': {
  					background: 'rgba(168, 213, 186, 0.1)'
  				}
  			},
  			'filter-rotate': {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			'wellness-pulse': {
  				'0%, 100%': {
  					boxShadow: '0 0 0 0 rgba(168, 213, 186, 0.7)'
  				},
  				'70%': {
  					boxShadow: '0 0 0 10px rgba(168, 213, 186, 0)'
  				}
  			},
  			'circle-outline': {
  				'0%': {
  					'clip-path': 'inset(0 100% 100% 0)'
  				},
  				'25%': {
  					'clip-path': 'inset(0 0 100% 0)'
  				},
  				'50%': {
  					'clip-path': 'inset(0 0 0 0)'
  				},
  				'75%': {
  					'clip-path': 'inset(0 0 0 100%)'
  				},
  				'100%': {
  					'clip-path': 'inset(100% 0 0 100%)'
  				}
  			}
  		},
  		backdropBlur: {
  			xs: '2px'
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
}


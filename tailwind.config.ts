import type { Config } from 'tailwindcss'
import { COLORS } from './src/constants/color.constants'

const config: Config = {
	darkMode: 'class',
	// mode:'jit',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			colors: COLORS,
			spacing: {
				0.5: '0.12rem',
				layout: '1.4rem',
				'big-layout': '2.3rem'
			},
			fontSize: {
				xs: '0.12rem',
				sm: '1.07rem',
				base: '1.18rem',
				lg: '1.24rem',
				xl: '1.38rem'
			},
			transitionDuration: {
				DEFAULT: '266ms'
			},
			width: {
				'1p': '1%',
				'2p': '1%',
				'3p': '1%',
				'4p': '1%',
				'5p': '1%',
				'6p': '1%'
			},

			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			}
		}
	},
	plugins: []
}

export default config

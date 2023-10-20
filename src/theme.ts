
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "9999px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "1px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #7D62FB 
		"--color-primary-50": "236 231 254", // #ece7fe
		"--color-primary-100": "229 224 254", // #e5e0fe
		"--color-primary-200": "223 216 254", // #dfd8fe
		"--color-primary-300": "203 192 253", // #cbc0fd
		"--color-primary-400": "164 145 252", // #a491fc
		"--color-primary-500": "125 98 251", // #7D62FB
		"--color-primary-600": "113 88 226", // #7158e2
		"--color-primary-700": "94 74 188", // #5e4abc
		"--color-primary-800": "75 59 151", // #4b3b97
		"--color-primary-900": "61 48 123", // #3d307b
		// secondary | #FF6978 
		"--color-secondary-50": "255 233 235", // #ffe9eb
		"--color-secondary-100": "255 225 228", // #ffe1e4
		"--color-secondary-200": "255 218 221", // #ffdadd
		"--color-secondary-300": "255 195 201", // #ffc3c9
		"--color-secondary-400": "255 150 161", // #ff96a1
		"--color-secondary-500": "255 105 120", // #FF6978
		"--color-secondary-600": "230 95 108", // #e65f6c
		"--color-secondary-700": "191 79 90", // #bf4f5a
		"--color-secondary-800": "153 63 72", // #993f48
		"--color-secondary-900": "125 51 59", // #7d333b
		// tertiary | #21A0A0 
		"--color-tertiary-50": "222 241 241", // #def1f1
		"--color-tertiary-100": "211 236 236", // #d3ecec
		"--color-tertiary-200": "200 231 231", // #c8e7e7
		"--color-tertiary-300": "166 217 217", // #a6d9d9
		"--color-tertiary-400": "100 189 189", // #64bdbd
		"--color-tertiary-500": "33 160 160", // #21A0A0
		"--color-tertiary-600": "30 144 144", // #1e9090
		"--color-tertiary-700": "25 120 120", // #197878
		"--color-tertiary-800": "20 96 96", // #146060
		"--color-tertiary-900": "16 78 78", // #104e4e
		// success | #84cc16 
		"--color-success-50": "237 247 220", // #edf7dc
		"--color-success-100": "230 245 208", // #e6f5d0
		"--color-success-200": "224 242 197", // #e0f2c5
		"--color-success-300": "206 235 162", // #ceeba2
		"--color-success-400": "169 219 92", // #a9db5c
		"--color-success-500": "132 204 22", // #84cc16
		"--color-success-600": "119 184 20", // #77b814
		"--color-success-700": "99 153 17", // #639911
		"--color-success-800": "79 122 13", // #4f7a0d
		"--color-success-900": "65 100 11", // #41640b
		// warning | #EAB308 
		"--color-warning-50": "252 244 218", // #fcf4da
		"--color-warning-100": "251 240 206", // #fbf0ce
		"--color-warning-200": "250 236 193", // #faecc1
		"--color-warning-300": "247 225 156", // #f7e19c
		"--color-warning-400": "240 202 82", // #f0ca52
		"--color-warning-500": "234 179 8", // #EAB308
		"--color-warning-600": "211 161 7", // #d3a107
		"--color-warning-700": "176 134 6", // #b08606
		"--color-warning-800": "140 107 5", // #8c6b05
		"--color-warning-900": "115 88 4", // #735804
		// error | #D41976 
		"--color-error-50": "249 221 234", // #f9ddea
		"--color-error-100": "246 209 228", // #f6d1e4
		"--color-error-200": "244 198 221", // #f4c6dd
		"--color-error-300": "238 163 200", // #eea3c8
		"--color-error-400": "225 94 159", // #e15e9f
		"--color-error-500": "212 25 118", // #D41976
		"--color-error-600": "191 23 106", // #bf176a
		"--color-error-700": "159 19 89", // #9f1359
		"--color-error-800": "127 15 71", // #7f0f47
		"--color-error-900": "104 12 58", // #680c3a
		// surface | #EFEFEF 
		"--color-surface-50": "253 253 253", // #fdfdfd
		"--color-surface-100": "252 252 252", // #fcfcfc
		"--color-surface-200": "251 251 251", // #fbfbfb
		"--color-surface-300": "249 249 249", // #f9f9f9
		"--color-surface-400": "244 244 244", // #f4f4f4
		"--color-surface-500": "239 239 239", // #EFEFEF
		"--color-surface-600": "215 215 215", // #d7d7d7
		"--color-surface-700": "179 179 179", // #b3b3b3
		"--color-surface-800": "143 143 143", // #8f8f8f
		"--color-surface-900": "117 117 117", // #757575
		
	}
}
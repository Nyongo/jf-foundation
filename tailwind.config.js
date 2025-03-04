/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
     "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'kt-white': '#E5E5E5',
      'purple': '#3f3cbb',
      'dark-blue': '#000D6E',
      'blue': '#5EB0BE',  
      'light-blue': '#008AFF', 
      'bright-blue': '#0097DA',
      
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'black': '#000000',
      'black-2': '#333333',
      'black-3': '#3E3E3E',
      'light-grey': '#EDEADE',
      'alabaster': '#FF000',
      'pink': {
        '900' : '#B01663',
      },
      'yellow': {
        '900': '#FEE200',
        '950': '#F99F1B',
      },
      "gray": {  
        '50': '#f9fafb', 
        '100': '#f3f4f6',
        '200': '#e5e7eb',
        '300': '#d1d5db',
        '400': '#9ca3af',
        '500': '#6b7280',
        '600': '#4b5563',
        '700': '#374151',
        '800': '#1f2937',
        '900': '#111827',
        '950': '#626262',
        '1000': '#232323',
        '1100': '#FCFDFE',
        '1200': '#00164C',
        '1300': '#C2C2C2',
        '1400': '#666666',
        '1500': '#F4F9FC',
        '1600': '#F2F2F2',
        '1700': '#F5F5F5',
        '1800': '#707070',
      },
      "slate": {
        '50': '#f8fafc',
        '100': '#f1f5f9',
        '200': '#e2e8f0',
        '300': '#cbd5e1',
        '400': '#94a3b8',
        '500': '#64748b',
        '600': '#475569',
        '700': '#334155',
        '800': '#1e293b',
        '900': '#0f172a',
      },
      'red':{
        '100': '#800000',
        '200': '#BF0000'
      }
    },
    extend:{
      animation: {
        marquee: 'marquee 15s linear infinite',
        marquee2: 'marquee2 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    }
    //fontFamily: {},
  },
  
}


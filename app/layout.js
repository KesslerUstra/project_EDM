import './globals.css'
import { Maven_Pro } from 'next/font/google';

const mavemPro = Maven_Pro({ subsets: ['latin'] })

export const metadata = {
  title: 'EDM Project',
  description: 'Improved Differential Evolution Project',
} 

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={mavemPro.className}>{children}</body>
    </html>
  )
}

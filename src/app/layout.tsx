import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'
import { MdClose, MdMenu } from 'react-icons/md'
import Link from 'next/link'
import Drawer from '@/components/drawer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anekapay Test',
  description: 'This is a test for Anekapay',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className={styles.nav}>
          <Drawer />
          <h1>
            <Link href={'/'} className='whitespace-nowrap'>
              Star Wars
            </Link>
          </h1>
        </nav>
        {children}
      </body>
    </html>
  )
}

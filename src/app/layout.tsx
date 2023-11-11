import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'
import { MdClose, MdMenu } from 'react-icons/md'
import Link from 'next/link'
import Drawer from '@/components/drawer'
import { FaGithub, FaGithubAlt } from 'react-icons/fa'

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
        <nav className={styles.nav + ' justify-between'}>
          <Drawer />
          <h1>
            <Link href={'/'} className='whitespace-nowrap'>
              Star Wars
            </Link>
          </h1>

          <div className='flex items-center gap-2 h-full'>
            <Link href={'/characters'} className='h-full flex items-center link link-hover'>
              Characters
            </Link>
            <Link href={'/about'} className='h-full flex items-center link link-hover'>
              About
            </Link>
            <a href="https://github.com/Dzyfhuba/next-graphql-swapi" target='_blank' rel='noreferrer' className='h-full flex items-center hover:opacity-50'>
            <FaGithub size={24} />
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

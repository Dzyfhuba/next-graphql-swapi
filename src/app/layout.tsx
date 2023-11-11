import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'
import { MdClose, MdMenu } from 'react-icons/md'
import Link from 'next/link'
import Drawer from '@/components/drawer'
import { FaGithub, FaGithubAlt } from 'react-icons/fa'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next GraphQL SWAPI from Hafidz Ubaidillah',
  description: 'Next GraphQL SWAPI from Hafidz Ubaidillah',
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
          <div>
            <Drawer />
            <h1>
              <Link href={'/'} className='whitespace-nowrap'>
                Star Wars
              </Link>
            </h1>

            <div className='hidden sm:flex items-center gap-2 h-full'>
              <Link href={'/'} className='h-full flex items-center link link-hover'>
                Home
              </Link>
              <Link href={'/characters'} className='h-full flex items-center link link-hover'>
                Characters
              </Link>
              <a href="https://github.com/Dzyfhuba/next-graphql-swapi" target='_blank' rel='noreferrer' className='h-full flex items-center hover:opacity-50'>
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </nav>
        {children}
        <Footer />
      </body>
    </html>
  )
}

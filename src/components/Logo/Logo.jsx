import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
     return (
          <Link href={`/`}>
               <Image alt='Logo' src={`/assets/logo.png`} width={35} height={20} className='rounded-full' />
          </Link>
     )
}

export default Logo

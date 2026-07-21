import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
     return (
          <>
               <Link href={`/`}>
                    <Image alt='Logo' src={`https://i.ibb.co.com/dJLvWpFn/logo.png`} width={35} height={20} className='rounded-full w-8 h-auto' />
               </Link>
          </>
     )
}

export default Logo

import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* <h1>Home</h1>
      <p>Random Text...</p> */}
      <Link href="/users" className='text-red-500'>Users</Link>
      <Link href="/campaigns" className='text-red-500'>Campaigns</Link>
    </main>
  )
}

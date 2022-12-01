import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <Head>
        <title>PPT | Home</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to PPT Malaysia</h1>
        <p className={styles.text}> lorem ipsum.. </p>
      </div>
    </>
  )
}

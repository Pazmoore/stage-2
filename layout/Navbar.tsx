import React from 'react'
import styles from "./navbar.module.scss";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <section className={styles.navbar}>
        <nav className={styles.nav}>
            <div className={styles.nav_one}>
                <Image
                src="/image/navbar/ticket.svg"
                width={30}
                height={30}
                alt="download"
                />
                <Image
                src="/image/navbar/ticz.svg"
                width={30}
                height={30}
                alt="download"
                />
            </div>
            <ul className={styles.nav_one}>
                <li>
                    <Link className='one' href={"/"}>Events</Link>
                </li>
                <li>
                    <Link style={{ color: '#B3B3B3' }} href={"/"}>My Tickets</Link>
                </li>
                <li>
                    <Link style={{ color: '#B3B3B3' }} href={"/"}>About Project</Link>
                </li>
            </ul>

            <div className={styles.nav_two}>
                <p>My Tickets</p>
                <Image
                    src="/image/navbar/line.svg"
                    width={10}
                    height={10}
                    alt="download"
                />
            </div>

        </nav>
    </section>
  )
}

export default Navbar
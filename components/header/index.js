import styles from "../header/header.module.css"
import logo from  "../../assets/images/logo.png"
import Image from 'next/image'

export default function Header(){
    return(
        <div className={styles.header}>
            <div className="container d-flex justify-content-center  align-items-center justify-content-md-start">
                <Image src={logo} alt="logo notations" height={50}></Image>
            </div>
        </div>

    )
}
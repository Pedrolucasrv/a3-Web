import styles from "../footer/footer.module.css"

export default function Header(){
    return(
        <div className={`mt-2 ${styles.footer}`}>
            <div className="container d-flex justify-content-center flex-column  align-items-center justify-content-md-start">
                <p className="m-0"><strong>Desenvolvido por:</strong></p>  
                <p>Pedro Lucas | Adelia Camargo</p>
            </div>
        </div>

    )
}
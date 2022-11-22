import styles from "../styles/Home.module.css"
import plusIcon from "../assets/images/plus.svg"
import Image from 'next/image'

import { AddModal } from "../components/modal";
import {useState, useEffect} from "react"
import lixo from "../assets/images/lixo.svg"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";




export default function Home() {
  const [ modalAdd , setModalAdd ] = useState(false)
  const [ count , setCount ] = useState(0)
  const [ notesArr , setNotes ] = useState([])
  const notifyDelete = () => toast.success("Nota excluida com sucesso!");

  function deleteNote(id){


    axios({
        method: 'delete',
        url: '/api/notes',
        data: {
          id: id
        }
      }).then(function (response) {
        notifyDelete()
        setCount(count+1)
        return response
      }).catch(function (err){
        return err
      });
}

  useEffect(() => {
    axios.get("/api/notes").then((res)=> {
      notes = res.data
      
      setNotes(res.data)

    })
    .catch((err)=> {
      console.error(err)
    })
  },[count])

  return (
    <div className="container" style={{minHeight: "78vh"}}>
      <div className="row mt-4">
        <div className="col-lg-3 my-2 col-md-6 col-12">
          <div className={styles.newNote} onClick={() => setModalAdd(!modalAdd)}>
              <Image height={30} src={plusIcon} alt="adicionar nova nota"></Image>
          </div>
        </div>
        {
              notesArr.map(
              (item)=>
                <div key={item.id} className="col-lg-3 col-md-6 col-12 my-2">
                  <div className={styles.note} >
                    <div className={`d-flex justify-content-end clickable`}>
                      <Image onClick={()=> {deleteNote(item.id)}}  alt="Deletar nota" src={lixo} height={18}></Image>
                    </div>
                    <div>

                    <h2 className={styles.noteTitle}>{item.title}</h2>
                    </div>
                    <br/>
                    <div>

                    <p className={`m-0 ${styles.noteContent}`}>{item.content}</p>
                    </div>
                  </div>
                </div>
                        
          )

        }

      </div>

        <AddModal  show={modalAdd}
        onHide={() => {
          setModalAdd(false) 
          setCount(count+1)
        }}></AddModal>
      
    <ToastContainer/>
      
    </div>
  )
}

// export const getServerSideProps = async (context) => {
    
//   const res = await fetch("http://localhost:3000/api/notes");
//   const notes = await res.json();
  

//   return {
//     props: {
//       notes

//     },
  
//   };
// } 

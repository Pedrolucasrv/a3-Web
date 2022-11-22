import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from "react"

export function AddModal(props) {
  const notify = (a) => toast.success(a.message);


  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = data => {
    setLoading(true)

    axios({
      method: 'post',
      url: '/api/notes',
      data: data
    }).then(function (response) {
    
      notify(response.data)

    return response

    }).catch(function (err){
      return err
    }).finally(function() {
      reset()
      setLoading(false)
    });
  }

  return (
    <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adicionar Nota
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
        <input className='mb-2' type="undefined" placeholder="Titulo" {...register("title",{ required: "Por favor, digite um titulo!", maxLength: 20 })}  />
        <textarea rows={5} className='mb-2'  type="undefined" placeholder="Conteúdo" {...register("content",{ required: "Por favor, digite uma descrição!", maxLength: 320 })} />

        <input type="submit" disabled={loading} className='submitBtn'/>
        <div className='d-flex flex-column text-danger'>
          <p className='m-0'>
            {errors.content?.message}
          </p>
          <p>
           {errors.title?.message}
          </p>
        </div>
    </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>

    </>
  );
}
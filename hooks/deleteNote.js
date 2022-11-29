import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function deleteNote(id){

    axios({
        method: 'delete',
        url: '/api/notes',
        data: {
          id: id
        }
      }).then(function (response) {

        window.location.reload();
        return response
      }).catch(function (err){
        return err
      });
}

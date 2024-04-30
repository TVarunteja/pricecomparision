import  { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'
import './Comparisiontable.css'

import { useLocation ,useNavigate  } from 'react-router-dom';
export default function ProductPage() {

    const location = useLocation()
    const pid = location.state.param1;

    
    
  const navigate = useNavigate();

  const [data, setData] = useState([{}]);
  const [error, setError] = useState('');





  const productpage = async () => {
    try 
    {
      const response = await axios.get(`${config.url}/getproductdetails/${pid}`);
      console.log(response.data)
      setData((response.data))
    }
    catch (error) 
    {
      setError(error.response.data);
    }
  };

  useEffect(() => {
    productpage();
  },[]);






  return (
    <div>
    <section>
        
      {data[0].comparisionlink1 && data[0].comparisionlink2 ? (
        <table>
            <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Comparision Link 1</th>
            <th> Comparision Link 2</th>
            </tr>

            <tr>
                <td>{data[0].productname}</td>
                <td>{data[0].newprice}</td>
                <td><a href={data[0].comparisionlink1} target="_blank">{data[0].comparisionlink1}</a></td>
                <td><a href={data[0].comparisionlink1} target="_blank">{data[0].comparisionlink2}</a></td>
            </tr>

        </table>



):(
  <div>No Data Found</div>
)

    }
    </section>
    </div>
  )


}
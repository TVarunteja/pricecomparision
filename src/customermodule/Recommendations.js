import  { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'
import './viewrecommendations.css'

import { useLocation ,useNavigate  } from 'react-router-dom';
export default function ProductPage() {

    
  const [recommendations, setRecommendations] = useState([]);
  const [customerData, setCustomerData] = useState("");
  let cemail=''
  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData)
      cemail=parsedCustomerData.email
      console.log(cemail)
    }

  }, []);



  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(`${config.url}/viewrecommendations/${cemail}`);
      console.log(response.data+"pp")
      setRecommendations(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };



  useEffect(() => {
    fetchRecommendations();
  },[]);

  const navigate = useNavigate();

  const [data, setData] = useState([{}]);
  const [error, setError] = useState('');
const toProductPage = async (productname) => {
  try 
  {
    console.log(productname+"[[[")
    const response = await axios.get(`${config.url}/getproductdetailspname/${productname}`);
    console.log(response.data)
    setData((response.data))
    navigate('/productpage',{state : { param1: response.data[0].productid, param2: cemail}}   )
  }
  catch (error) 
  {
    setError(error.response.data);
  }
};

  
  return (
    <div>
    <section>
        
      {recommendations.length > 0 ? (
recommendations.map((recommendation, index) => (
        <table>
            <tr>
            <th>Recommendation From</th>
            <th>Product Name</th>
            <th> Message </th>
            </tr>

            <tr>
                <td>{recommendation.fromemail}</td>
                <td>{recommendation.productname}</td>
                <td>{recommendation.text}</td>
                <td><button onClick={() => toProductPage(recommendation.productname)} >View</button></td>
            </tr>

        </table>

))

):(
  <div>No Recommendations</div>
)

    }
    </section>
    </div>
  )


}
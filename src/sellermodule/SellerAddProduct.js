import './StyleSheet.css'
import React, { useEffect , useState , useRef} from 'react';
import axios from 'axios';
import config from '../config'

export default function SellerAddProductPage() {


  const [sellerData, setSellerData] = useState({});

  useEffect(() => {
      const storedSellerData = localStorage.getItem('seller');
      if (storedSellerData) {
        const parsedSellerData = JSON.parse(storedSellerData);
        setSellerData(parsedSellerData)
      }
    }, []);


  const [formData, setFormData] = useState({
    companyname: '',
    productname:'',
    category: '',
    description:'',
    prevprice:'',
    newprice:'',
    seller:'',
    comparisionlink1:'',
    comparisionlink2:'',
    file:null
  });

  const fileInputRef = useRef(null); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('companyname', sellerData.companyname);
      formDataToSend.append('productname', formData.productname);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('prevprice', formData.prevprice);
      formDataToSend.append('newprice', formData.newprice);
      formDataToSend.append('seller', sellerData.email);
      formDataToSend.append('comparisionlink1', formData.comparisionlink1);
      formDataToSend.append('comparisionlink2', formData.comparisionlink2);
      formDataToSend.append('file', formData.file);

      const response = await axios.post(`${config.url}/insertproduct`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content type for FormData
        }
      });

      if (response.status === 200) {
        setFormData({
          companyname: '',
          productname:'',
          category: '',
          description:'',
          prevprice:'',
          newprice:'',
          seller:'',
          comparisionlink1:'',
          comparisionlink2:'',
          file:null
        });
        fileInputRef.current.value = '';
      }
      setMessage(response.data);
      setError('');
    } 
     
    catch (err) 
    {
      setError(err.response.data);
      setMessage(''); //set message to ""
    }
  };
  


  return (
    <div align="center">
      {message ? <h4 align="center">{message}</h4> : null}
      {error ? <h4 align="center" style={{ color: 'red' }}>{error}</h4> : null}
    
          <div class="container" >
          <form onSubmit={handleSubmit} encType="multipart/form-data" >
        <h2>Sell Product</h2>
        <div class="content">
        <div class="input-box">


        <label >Product Name</label>
        <input type="text" placeholder="Enter Product name" id="productname" value={formData.productname} onChange={handleChange} required/>

        <label >Product Category</label>
        <select placeholder="Select Product Category" id="category" value={formData.category} onChange={handleChange}  required>
            <option value="">Category</option>
            <option value="electronicgadgets">Electronic Gadgets</option>
            <option value="clothing">Clothing</option>
            <option value="furniture">Furniture</option>
            <option value="cookware">Cookware</option>
            <option value="fashion">Fashion</option>
            <option value="sports">Sports</option>
            <option value="homeappliances">Home Appliances</option>
            <option value="grocery">Grocery</option>
            <option value="other">Other</option>
        </select>

        <label >Product Description</label>
        <textarea placeholder="Enter Product Description" id="description" value={formData.description} onChange={handleChange} required/>

        <label >Product Previous Price</label>
        <input type="number" placeholder="Enter Previous Price of Product" id="prevprice" value={formData.prevprice} onChange={handleChange} required/>

        <label >Product New Price</label>
        <input type="number" placeholder="Enter New Price of Product" id="newprice" value={formData.newprice} onChange={handleChange} required/>

        <label >Comparision Link 1</label>
        <input type="url" placeholder="Comparision Link 1" id="comparisionlink1" value={formData.comparisionlink1} onChange={handleChange} required/>

        <label>Comparision Link 2</label>
        <input type="url" placeholder="Comparision Link 2" id="comparisionlink2" value={formData.comparisionlink2} onChange={handleChange} required/>


        <label >Product Image</label>
        <input type="file" alt="Image" id="file" ref={fileInputRef} onChange={handleFileChange} />

        </div>
        </div>


        <button type="submit">Submit</button>
        </form>


        </div>
        </div>

  )

}




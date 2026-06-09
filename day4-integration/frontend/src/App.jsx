import React from 'react'
import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    amount: "",
    currency: "",
    stock: "",
  })

  let handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("formData", formData);

      let res = await axios.post('http://localhost:3000/create-product',formData )
      console.log(res)

    } catch (error) {
      console.log("error in post api ", error)
    }
  }


  return (
    <div>
      <h1> Product creation form</h1>

      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>Product Details</legend><br />
          {/* name */}
          <label htmlFor="name">Product Name:</label> <br />
          <input onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" id="name" name="name" /> <br /> <br />

          {/* description */}
          <label htmlFor="description">Description:</label> <br />
          <input onChange={(e) => setFormData({ ...formData, description: e.target.value })} type="text" id="description" name="description" /> <br /> <br />

          {/* category */}
          <label htmlFor="category">Category:</label> <br />
          <select onChange={(e) => setFormData({ ...formData, category: e.target.value })} name="category" id="category">
            <option value="MEN">MEN</option>
            <option value="WOMEN">WOMEN</option>
            <option value="KIDS">KIDS</option>
          </select> <br /> <br />

        </fieldset> <br /> <br />

        <fieldset>
          <legend>Price</legend> <br />
          {/* price */}

          <label htmlFor="Amount">Amount:</label> <br />
          <input onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })} type="number" id="Amount" name="Amount" /> <br /> <br />

          <label htmlFor="Currency">SelectCurrency:</label> <br />
          <select onChange={(e) => setFormData({ ...formData, currency: e.target.value })} name="Currency" id="Currency">
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </fieldset> <br />

        {/* stock */}
          <label htmlFor="stock">Stock:</label> <br />
          <input onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} type="number" id="stock" name="stock" /> <br /> <br />

          <button>Submit form</button>

      </form>
    </div>
  )
}

export default App


import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    name: '',
    image: null,
    token: '',
    value: []
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleSelectChange = (e) => {
    this.setState({
      [e.target.id]: Array.from(e.target.selectedOptions, (item) => item.value)
    });
  }

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', this.state.image, this.state.image.name);
    form_data.append('name', this.state.name);
    let url = 'http://localhost:8000/api/client/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization' : 'JWT '+ this.state.token
      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <p>
            <input type="text" placeholder='JWT Token' id='token' value={this.state.token} onChange={this.handleChange} required/>
          </p>
          <p>
            <input type="text" placeholder='Name' id='name' value={this.state.name} onChange={this.handleChange} required/>
          </p>
          <p>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
          <p>
            <select multiple={true} id='value' value={this.state.value} onChange={this.handleSelectChange}>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </p>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default App;

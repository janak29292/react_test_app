
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    id : '',
    name: '',
    doc: null,
    image1: null,
    image2: null,
    token: '',
    value: [],
    topics: [],
    cta: "interview"
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
      [e.target.id]: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    console.log(this.value);
    let form_data = new FormData();
    form_data.append('press_release', this.state.doc, this.state.doc.name);
    form_data.append('images', this.state.image1, this.state.image1.name);
    form_data.append('images', this.state.image2, this.state.image2.name);
    form_data.append('title', this.state.name);
    form_data.append('client', 'http://0.0.0.0:8000/api/client/1/')
    form_data.append("topics", "http://0.0.0.0:8000/api/interest/2/" )
    form_data.append("topics", "http://0.0.0.0:8000/api/interest/1/" )
    form_data.append("cta", "interview")
    form_data.append("cta", "coverage")
    form_data.append('content', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    form_data.append('availability', 'regular')
    let url = 'http://localhost:8000/api/pitch/'+ this.state.id + '/';
    axios.patch(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization' : 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InByQGdtYWlsLmNvbSIsImV4cCI6MTU2ODE4ODc0MywiZW1haWwiOiJwckBnbWFpbC5jb20iLCJvcmlnX2lhdCI6MTU2NTU5Njc0M30.-FdcW4L26_xGRDhSEXRxXDxPjaEVnErJtsXrfhfwoiw'
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
            <input type="text" placeholder='ID' id='id' value={this.state.id} onChange={this.handleChange} required/>
          </p>
          <p>
            <input type="text" placeholder='Title' id='name' value={this.state.name} onChange={this.handleChange} required/>
          </p>
          <p>
          <label for="doc">DOC</label>
            <input type="file"
                   id="doc"
                  onChange={this.handleImageChange} required/>
          </p>
          <p>
          <label for="image1">Image1</label>
            <input type="file"
                   id="image1"
                  onChange={this.handleImageChange} required/>
          <label for="image2">Image1</label>
            <input type="file"
                   id="image2"
                  onChange={this.handleImageChange} required/>
          </p>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default App;

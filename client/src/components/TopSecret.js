import React, { useEffect, useState } from "react";

import axios from 'axios';

import { Link } from "react-router-dom";

import { useAuthToken } from "../hooks";

const TopSecret = props => {
  const [token, setToken] = useAuthToken();

  const [data, setData] = useState(null);

  useEffect(() => {
    

    if(token){
      console.log('Downloading data...');
      axios.create({ headers: { authorization: token }}).get('http://localhost:3333/api/restricted/data')
      .then(res => {
        setData(res.data);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, token)

  return (
    <div>
      { token ? (
        data ? <div className='list'>{
          data.map(person => {
            return <div key={person.name}>{person.name}</div>
          })
        }</div> : <h2>Loading...</h2>
      ) : (
        <p>
          <Link to="/login">Click here to view this</Link> top secret
          info!
        </p>
      )}
    </div>
  );
};

export default TopSecret;

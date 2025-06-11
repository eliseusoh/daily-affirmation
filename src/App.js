import './App.css';
import { useState, useEffect } from 'react';

function App() {

  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')

  // function to fetch a quote
  const fetchQuote = () =>{
    
  const url = 'https://zenquotes.io/api/random';
  //using timestamp to update the quote 
  // allorigins is a middleman that allows you to pull from any page as zenquotes was blocked by CORS
  // so its a 2 steps process
  const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(`${url}?t=${new Date().getTime()}`);

    fetch(proxyUrl)
    .then((response)=> {
      if(response.ok)return response.json()
      throw new Error('Network response was not okay')
    })
    .then((data)=>{
      // turning JSON string back into object that we can use
      const contents = JSON.parse(data.contents)
      setQuote(contents[0].q);
      setAuthor(contents[0].a);
    })
    .catch((error)=>{
      console.error('Error fetching quote: ', error)
    })
  }

  
  //useEffect calls fetchQuote when it loads
  useEffect(()=>{
    fetchQuote()
  },[])


  return (
    // adds light or dark to container name based on toggle
    <div className='container'>
      <h1>🌸🌸Daily Affirmation🌸🌸</h1>
      <h3 className='quote'>"{quote}"</h3>
      <p className='author'><i>- {author}</i></p>
      <button onClick={fetchQuote}>New Affirmation</button>
    </div>
  );

}

export default App;

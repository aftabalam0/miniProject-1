import React from 'react';

export default function Meme(){
   const [formData,setFormData]=React.useState({
    topText:"",
    bottomText:"",
    randomImage:""
   })
   
   const [meme,setMeme]=React.useState([])
   function handleChange(event){
    setFormData((prevState)=>{
        return {
            ...prevState,
            [event.target.name]:event.target.value
        }
    })
   }
   
   React.useEffect(()=>{
      fetch("https://api.imgflip.com/get_memes")
      .then(res=>res.json())
      .then(data=>setMeme(data.data.memes));
   },[])
   
   function handleClick(){
    const randomNum=Math.floor(Math.random()*(meme.length+1))
    const url=meme[randomNum].url
    setFormData((prevState)=>{
        return{
            ...prevState,
            randomImage:url
        }
    })
   } 

    return(
        <main>
        <div className='form'>
                <input 
                type="text"
                placeholder='Top Text' 
                className='form-input'
                value={formData.topText}
                onChange={handleChange}
                name="topText"
             />
            <input 
                type="text" 
                placeholder='Bottom Text' 
                className='form-input'
                name='bottomText'
                value={formData.bottomText}
                onChange={handleChange}
            />
            <button className='form-button' onClick={handleClick}>Get a new meme image 🖼</button>
        </div>
         <div className='meme'>
           <img src={formData.randomImage} className="meme-image" />
           <h2 className='meme-text top'>{formData.topText}</h2>
           <h2 className='meme-text bottom'>{formData.bottomText}</h2>


         </div>
        </main>
    )
}
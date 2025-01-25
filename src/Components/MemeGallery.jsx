// import React from 'react';

const MemeGallery = () => {
    // Stocker les memes localement
    const memes =  JSON.parse(localStorage.getItem('memes')) || [];
  return (
    <div style={{textAlign:'center'}}>
      <h2>Meme Gallery</h2>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
        {memes.map((meme,index) => (
            <img key={index} src={meme} alt={`Meme ${index}`} style={{width:'100%',marginBottom:'10px'}}/>
        ))}
      </div>
    </div>
  );
}

export default MemeGallery;
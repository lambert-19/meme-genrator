import React from 'react';
import * as fabric from 'fabric';
import { saveAs } from 'file-saver';
import axios from 'axios';

const MemeEditor = () => {
    const canvasRef = React.useRef(null);
    const canvasInstance = React.useRef(null);

    // Initialisation du canvas
    React.useEffect(() => {
        if (!canvasInstance.current) {
            const newCanvas = new fabric.Canvas(canvasRef.current, {
                width: 500,
                height: 500,
                backgroundColor: '#f3f3f3',
            });
            canvasInstance.current = newCanvas;
        }

        return () => {
            // Nettoyage lors du démontage
            if (canvasInstance.current) {
                canvasInstance.current.dispose();
                canvasInstance.current = null;
            }
        };
    }, []);

    // Fonction pour ajouter une image
    const uploadImage = (e) => {
        
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            let imageURL = e.target.result;
            const imageElement = document.createElement('img');
            imageElement.src = imageURL;
            imageElement.onload = () => {
                const image = new fabric.Image(imageElement);
                const canvas = canvasInstance.current;

                // Scale the image to fit the canvas
                const scaleX = canvas.width / image.width;
                const scaleY = canvas.height / image.height;
                const scale = Math.min(scaleX, scaleY);
                image.scale(scale);
                
                canvasInstance.current.add(image);
                canvasInstance.current.centerObject(image);
                canvasInstance.current.setActiveObject(image);
            };
       
      };
    };

    // Fonction pour ajouter du texte
    const addText = () => {
        const text = new fabric.Textbox('Votre texte ici', {
            left: 50,
            top: 50,
            fill: '#000',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            fontSize: 20,
            textAlign: 'center',
        });
        canvasInstance.current.add(text);
    };

    // Fonction pour télécharger le meme
    const downloadMeme = () => {
        const dataUrl = canvasInstance.current.toDataURL({
            format: 'png',
        });
        saveAs(dataUrl, 'meme.png');

        // Stocker les memes dans le localStorage
        const memes = JSON.parse(localStorage.getItem('memes')) || [];
        memes.push(dataUrl);
        localStorage.setItem('memes', JSON.stringify(memes));
        alert('Meme téléchargé et stocké avec succès !');
    };

    // Fonction pour partager le meme
    const shareMeme = async () => {
        const dataUrl = canvasInstance.current.toDataURL({ format: 'png' });
        const blob = await (await fetch(dataUrl)).blob();
        const formData = new FormData();
        formData.append('image', blob);
    
        try {
            // Remplacez 'YOUR_IMGUR_CLIENT_ID' par votre véritable ID client Imgur
            const response = await axios.post('https://api.imgur.com/3/image', formData, {
                headers: {
                    Authorization: 'Client-ID 48a9d39b01562a9',
                },
            });
    
            const imageUrl = response.data.data.link; // URL publique de l'image
            const twitterUrl = `https://twitter.com/intent/tweet?text=Check%20out%20my%20meme!&url=${encodeURIComponent(imageUrl)}`;
            window.open(twitterUrl, '_blank');
        } catch (error) {
            console.error('Error uploading image to Imgur:', error);
            alert('Failed to upload image. Please try again.');
        }
    };
    

    return (
        <div style={{ textAlign: 'center', alignContent: 'center' }}>
            <input type="file" accept='image/*'  style={{ marginBottom: '10px' }}  onChange={uploadImage} />
            <div style={{ marginBottom: '10px' }}>
                <button onClick={addText} style={{ marginRight: '5px' }}>Ajouter du Texte</button>
                <button onClick={downloadMeme} style={{ marginRight: '5px' }}>Télécharger</button>
                <button onClick={shareMeme}>Partager</button>
            </div>
            <canvas
                ref={canvasRef}
                style={{
                    border: '1px solid #ccc',
                    marginTop: '10px',
                }}
               
            />
        </div>
    );
};

export default MemeEditor;

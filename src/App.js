// @ts-nocheck  
import React, {useState, useEffect} from 'react';
import ImageCards from './components/imageCards';
import ImageSearch from './components/imageSearch';

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    async function getPhotos() {

      try {
        const request = await fetch(
          `https://pixabay.com/api/?key=15987756-6b39ffb11987b1f248b225699&q=${term}&image_type=photo`,
        );
        const result = await request.json();
        const data = result.hits;
        setImages(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error)
      }
    }

    getPhotos();
  }, [term])
  return (
    <div className='container mx-auto'>
      <ImageSearch searchText={(text) => setTerm(text)}/>

      {!isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">No Images Found</h1>}
      {isLoading ?
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> :
        <div className='grid grid-cols-3 gap-4'>
        {images.map((image) => (
          <ImageCards key={image.id} image={image} />
        ))}
      </div>}
    </div>
  );
}

export default App;

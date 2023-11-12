import  { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const importImages = async (imageNames) => {
  const imports = {};
  const importPromises = imageNames.map(async (imageName) => {
    try {
      const module = await import(`../assets/home/${imageName}.jpg`);
      imports[imageName] = module.default;
    } catch (error) {
      console.error(`Error importing image ${imageName}:`, error);
    }
  });

  await Promise.all(importPromises);
  return imports;
};

const Banner = () => {
  const [imports, setImports] = useState({});

  useEffect(() => {
    const imageNames = Array.from({ length: 6 }, (_, index) => (index + 1).toString().padStart(2, '0'));
    const loadImages = async () => {
      const importedImages = await importImages(imageNames);
      setImports(importedImages);
    };

    loadImages();
  }, []);

  return (
    <div>
      <Carousel>
        {Object.entries(imports).map(([imageName, importedModule]) => (
          <div key={imageName}>
            <img src={importedModule} alt={`Image ${imageName}`} />
           
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;

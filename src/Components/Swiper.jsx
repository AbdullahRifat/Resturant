import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';


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
  

    






const Catgory =()=> {

    const [imports, setImports] = useState({});
  
    useEffect(() => {
      const imageNames = Array.from({ length: 5 }, (_, index) => `slide${index + 1}`);
      const loadImages = async () => {
        const importedImages = await importImages(imageNames);
        setImports(importedImages);
      };
  
      loadImages();
    }, []);



  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >


{Object.entries(imports).map(([imageName, importedModule]) => (
        
             <SwiperSlide key={imageName}><img src={importedModule} alt={`Image ${imageName}`} /></SwiperSlide>
            
           
       
        ))}
       
      </Swiper>
    </>
  );
}
 export default Catgory
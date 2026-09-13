import Section from "../Section/Section";
import Container from "../Container/Container";
import { getPhotos } from "../../services/photos";
import Form from "../Form/Form";
import toast, { Toaster } from "react-hot-toast";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import Modal from "../Modal/Modal";

// import { useEffect } from "react";

export default function App() {
  // useEffect(() => {
  //   const handleSearch = async () => {
  //     const response = await getPhotos("Cats");
  //     console.log(response);
  //   };
  //   handleSearch();
  // }, []);
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleSubmit = async (query: string) => {
   
    try {
      setPhotos([])
      setIsLoading(true)
      setIsError(false)

      const response = await getPhotos(query);
      if (response.length === 0) {
        toast.error("No photos found...")
        return
      }
      setPhotos(response);
    } catch {
      setIsError(true)
      
    } finally {
      setIsLoading(false)
    }
   
  };

  const handlePhotoClick = (photo: Photo | null) => { 
    setSelectedPhoto(photo);
  } 

  return (
    <>
      <Section>
        <Container>
          <Toaster/>
          <Form onSubmit={handleSubmit} />
          {photos.length > 0 && <PhotosGallery photos={photos} handlePhotoClick={handlePhotoClick}/>}
          {isLoading && <Loader />}
          {isError && <Text>Some went wrong...</Text>}
          {selectedPhoto && (
            <Modal onClose={()=>handlePhotoClick(null)}> <img
              src={selectedPhoto.src.large}
              alt={selectedPhoto.alt}
            /></Modal>
          )}
        </Container>
      </Section>
    </>
  );
}

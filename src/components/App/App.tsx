import Section from "../Section/Section";
import Container from "../Container/Container";
import { getPhotos } from "../../services/photos";
import Form from "../Form/Form";
import toast, { Toaster } from "react-hot-toast";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import { useState } from "react";
import type { Photo } from "../../types/photo";

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

  const handleSubmit = async (query: string) => {
    const response = await getPhotos(query);
    if (response.length === 0) {
      toast.error("No photos found...")
      return
    }
    setPhotos(response);
  };

  return (
    <>
      <Section>
        <Container>
          <Toaster/>
          <Form onSubmit={handleSubmit} />
          <PhotosGallery photos={photos}/>
        </Container>
      </Section>
    </>
  );
}

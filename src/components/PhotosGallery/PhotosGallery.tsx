import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps{
  photos: Photo[]
}
export default function PhotosGallery({photos}: PhotosGalleryProps) {
  return <Grid> {photos.map((photo
  ) => (
    
      <PhotosGalleryItem key={photo.id} photo={photo}/>
    
  ))}</Grid>;
}

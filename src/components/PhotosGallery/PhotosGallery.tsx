import type { Photo } from "../../types/photo";
import Grid from "../Grid/Grid";
import PhotosGalleryItem from "../PhotosGalleryItem/PhotosGalleryItem";

interface PhotosGalleryProps{
  photos: Photo[]
  handlePhotoClick: (photo: Photo)=>void
}
export default function PhotosGallery({photos, handlePhotoClick}: PhotosGalleryProps) {
  return <Grid> {photos.map((photo
  ) => (
    
    <PhotosGalleryItem key={photo.id} photo={photo} handlePhotoClick={handlePhotoClick} />
    
  ))}</Grid>;
}

import axios from "axios";
import type { Photo } from "../types/photo";

interface PexelsResponse {
  photos: Photo[];
}

const API_KEY = import.meta.env.VITE_API_KEY;
axios.defaults.baseURL = "https://api.pexels.com/v1/";
axios.defaults.headers.common["Authorization"] = API_KEY;
axios.defaults.params = {
  orientation: "landscape",
};

export const getPhotos = async (query: string): Promise<Photo[]> => {
  const response = await axios.get<PexelsResponse>(`search?query=${query}`);

  return response.data.photos;
};

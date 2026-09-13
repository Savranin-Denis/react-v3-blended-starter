import style from "./Loader.module.css";
import { MoonLoader } from "react-spinners";



export default function Loader() {
  return <div className={style.backdrop}><MoonLoader color="#36d7b7" /></div>;
}

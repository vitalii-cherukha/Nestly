import Loader from "@/components/Loader/Loader";
import css from "./loading.module.css";

export default function loading() {
  return (
    <div className={css.loadingBackdrop}>
      <Loader />
    </div>
  );
}

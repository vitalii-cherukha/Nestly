import Container from "../Container/Container";
import css from "./Breadcrumbs.module.css";

export default function Breadcrumbs() {
  return (
    <div>
      <Container>
        <p
          className={css.breadcrumbs}
        >{`Breadcrumbs > under > construction...`}</p>
      </Container>
    </div>
  );
}

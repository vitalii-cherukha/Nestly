import css from "./editLayout.module.css";

const EditLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={css.editLayout}>
      <main>{children}</main>
    </div>
  );
};

export default EditLayout;

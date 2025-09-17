import css from "./authLayout.module.css";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={css.authLayout}>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;

import { useIntl } from "react-intl";

export default function Footer() {
  const intl = useIntl();

  return (
    <footer className="footer body__element">
      <p className="footer__copyright">
        &copy; 2021{" "}
        {intl.formatMessage({
          id: "my_name",
          defaultMessage: "Максим Толстокорый",
        })}
      </p>
    </footer>
  );
}

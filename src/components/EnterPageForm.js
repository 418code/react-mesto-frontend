import { enterConfig } from "../utils/utils";

export default function EnterPageForm(props) {
  return (
    <div className="enter">
      <div
        className={`page__container page__container_theme_${enterConfig.containerThemeEntrance}`}
      >
        <form
          name={props.name}
          className={`page__form page__form_theme_${enterConfig.containerThemeEntrance}`}
          onSubmit={props.onSubmit}
        >
          <h2
            className={`page__form-title page__form-title_theme_${enterConfig.containerThemeEntrance}`}
          >
            {props.formTitle}
          </h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}

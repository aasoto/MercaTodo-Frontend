import { env } from "../../../classes";

export const MercaTodoLogo = ({height}) => {
    return (
        <img aria-label="logo-image" className={height} src={`${env.url}/src/assets/merca-todo-logo.svg`} alt="merca-todo-logo" />
    );
}

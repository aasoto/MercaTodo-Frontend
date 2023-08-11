import { ENV } from "../../../../env";

export const MercaTodoLogo = ({height}) => {

    const { url } = ENV;

    return (
        <img aria-label="logo-image" className={height} src={`${url}/src/assets/merca-todo-logo.svg`} alt="merca-todo-logo" />
    );
}

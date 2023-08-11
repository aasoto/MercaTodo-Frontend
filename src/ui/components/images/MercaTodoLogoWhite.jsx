import { ENV } from "../../../../env";

export const MercaTodoLogoWhite = () => {
    const { url } = ENV;

    return (
        <img aria-label="logo-image" className="h-10" src={`${url}/src/assets/merca-todo-logo-white.svg`} alt="merca-todo-logo-white" />
    );
}

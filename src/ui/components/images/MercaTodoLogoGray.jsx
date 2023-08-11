import { ENV } from "../../../../env";

export const MercaTodoLogoGray = () => {
    const { url } = ENV;

    return (
        <img aria-label="logo-image" className="h-10" src={`${url}/src/assets/merca-todo-logo-gray.svg`} alt="merca-todo-logo-gray" />
    );
}

import { env } from "../../../classes";

export const MercaTodoLogoGray = () => {
    return (
        <img aria-label="logo-image" className="h-10" src={`${env.url}/src/assets/merca-todo-logo-gray.svg`} alt="merca-todo-logo-gray" />
    );
}

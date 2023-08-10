import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { env } from "../../../classes";

export const SliderImages = ({ arrayPictures }) => {

    const { APIUrl, productsImagesEndpont } = env;

    const [focusedImage, setFocusedImage] = useState(arrayPictures[0]);
    const [numberPicture, setNumberPicture] = useState(1);
    const [pictures, setPictures] = useState(arrayPictures);

    const previousImage = () => {
        if (numberPicture === 1) {
            if (pictures[2] === `${APIUrl}${productsImagesEndpont}`) return;
        } else {
            if (pictures[(numberPicture - 1) - 1] === `${APIUrl}${productsImagesEndpont}`) return;
        }

        if (numberPicture === 1) {
            setNumberPicture(3);
        } else {
            setNumberPicture(numberPicture - 1);
        }
        setFocusedImage(pictures[numberPicture - 1]);
    }

    const nextImage = () => {
        if (numberPicture === 3) {
            if (pictures[0] === `${APIUrl}${productsImagesEndpont}`) return;
        } else {
            if (pictures[(numberPicture - 1) + 1] === `${APIUrl}${productsImagesEndpont}`) return;
        }

        if (numberPicture === 3) {
            setNumberPicture(1);
        } else {
            setNumberPicture(numberPicture + 1);
        }
        setFocusedImage(pictures[numberPicture - 1]);
    }

    const automaticallyFocusImage = (number, image) => {
        setNumberPicture(number);
        setFocusedImage(image);
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <div className="grid grid-cols-10 content-center object-center gap-3">
                <div className="col-span-1 flex justify-center items-center">
                    <button onClick={previousImage} className="bg-transparent hover:bg-gray-300 p-1.5 rounded-md transition duration-200">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="col-span-8 flex justify-center items-center">
                    <img
                        className="h-80"
                        src={focusedImage}
                        alt="focused_image"
                    />
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    <button onClick={nextImage} className="bg-transparent hover:bg-gray-300 p-1.5 rounded-md transition duration-200">
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="flex justify-center items-center gap-3">
                <img
                    onClick={() => automaticallyFocusImage(1, pictures[0])}
                    className={
                        focusedImage == pictures[0]
                            ? "w-20 border-4 border-red-500 cursor-pointer"
                            : "w-20 border-4 border-white cursor-pointer"
                    }
                    src={pictures[0]}
                    alt="picture_1"
                />
                {
                    pictures[1] != `${APIUrl}${productsImagesEndpont}` &&
                    <img
                        onClick={() => automaticallyFocusImage(2, pictures[1])}
                        className={
                            focusedImage == pictures[1]
                                ? "w-20 border-4 border-red-500 cursor-pointer"
                                : "w-20 border-4 border-white cursor-pointer"
                        }
                        src={pictures[1]}
                        alt="picture_2"
                    />
                }
                {
                    pictures[2] != `${APIUrl}${productsImagesEndpont}` &&
                    <img
                        onClick={() => automaticallyFocusImage(3, pictures[2])}
                        className={
                            focusedImage == pictures[2]
                                ? "w-20 border-4 border-red-500 cursor-pointer"
                                : "w-20 border-4 border-white cursor-pointer"
                        }
                        src={pictures[2]}
                        alt="picture_3"
                    />
                }
            </div>
        </div>
    );
}

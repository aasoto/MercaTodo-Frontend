import { useParams } from "react-router-dom";
import { Showcase, env } from "../../../classes";
import { useEffect, useState } from "react";
import { Container, PageTitle, PrimaryInfoXL } from "../../components";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export const ShowProductPage = () => {

  const { slug } = useParams();

  const [response, setResponse] = useState({ loading: true });
  const [focusedImage, setFocusedImage] = useState('');
  const [numberPicture, setNumberPicture] = useState(1);
  const [pictures, setPictures] = useState([]);

  const showcaseRequest = new Showcase();

  const { APIUrl, showcaseEndpoints, productsImagesEndpont } = env;
  const { endPoint, parameters } = showcaseEndpoints.getData;

  useEffect(() => {
    showcaseRequest.getData(`${APIUrl}${endPoint}/${slug}?include=${parameters.include}`)
      .then(resp => {
        setFocusedImage(resp.data.data.picture_1);
        setPictures([
          resp.data.data.picture_1,
          resp.data.data.picture_2,
          resp.data.data.picture_3,
        ]);
        setResponse({ loading: false, ...resp });
      });
  }, []);

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

  return (
    <Container>
      {
        response.loading
          ? <PrimaryInfoXL>Cargando...</PrimaryInfoXL>
          :
          <div className="bg-white rounded-md px-10 py-4 shadow">
            <PageTitle>
              {response.data.data.name}
            </PageTitle>
            <hr className="border" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
              <div className="col-span-2 flex flex-col justify-center items-center gap-4">
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
                    className={
                      focusedImage == response.data.data.picture_1
                        ? "w-20 border-4 border-red-500"
                        : "w-20 border-4 border-white"
                    }
                    src={response.data.data.picture_1}
                    alt="picture_1"
                  />
                  {
                    pictures[1] != `${APIUrl}${productsImagesEndpont}` &&
                    <img
                      className={
                        focusedImage == response.data.data.picture_2
                          ? "w-20 border-4 border-red-500"
                          : "w-20 border-4 border-white"
                      }
                      src={response.data.data.picture_2}
                      alt="picture_2"
                    />
                  }
                  {
                    pictures[2] != `${APIUrl}${productsImagesEndpont}` &&
                    <img
                      className={
                        focusedImage == response.data.data.picture_3
                          ? "w-20 border-4 border-red-500"
                          : "w-20 border-4 border-white"
                      }
                      src={response.data.data.picture_3}
                      alt="picture_3"
                    />
                  }
                </div>
              </div>
              <div className="col-span-2">

              </div>
            </div>
          </div>
      }

    </Container>
  )
}

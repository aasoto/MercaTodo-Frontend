import { useParams } from "react-router-dom";
import { Showcase } from "../../../classes";
import { useEffect, useState } from "react";
import { Container, PageTitle, PrimaryInfoXL } from "../../components";
import { SliderImages } from "./SliderImages";
import { DescriptionProduct } from "./DescriptionProduct";
import { ENV } from "../../../../env";

export const ShowProductPage = () => {

  const { slug } = useParams();

  const [response, setResponse] = useState({ loading: true });
  const [pictures, setPictures] = useState([]);

  const showcaseRequest = new Showcase();

  const { APIUrl, endPoints, parameters } = ENV;
  const { apiVersion, showcase } = endPoints;

  useEffect(() => {
    showcaseRequest.getData(`${APIUrl}${apiVersion}${showcase.index}/${slug}?include=${parameters.showcase.include}`)
      .then(resp => {
        setPictures([
          resp.data.data.picture_1,
          resp.data.data.picture_2,
          resp.data.data.picture_3,
        ]);
        setResponse({ loading: false, ...resp });
      });
  }, []);

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
              <div className="col-span-2">
                <SliderImages arrayPictures={pictures} />
              </div>
              <div className="col-span-2">
                <DescriptionProduct product={response.data.data}/>
              </div>
            </div>
          </div>
      }

    </Container>
  );
}

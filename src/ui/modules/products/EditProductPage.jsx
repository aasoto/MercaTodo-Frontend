import { useContext, useEffect, useState } from "react";
import { BasicInput, BasicLabel, Container, DangerInfoMini, ErrorMessage, ErrorMessageMini, MainButton } from "../../components";
import { useParams } from "react-router-dom";
import { Generics, Products } from "../../../classes";
import { ENV } from "../../../../env";
import { AuthContext } from "../../../context";
import { useForm } from "../../../hooks";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const EditProductPage = () => {

    const { slug } = useParams();

    const { token } = useContext(AuthContext);

    const { APIUrl, endPoints, parameters } = ENV;
    const { apiVersion, products } = endPoints;

    const [alert, setAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);

    const [picture1Charged, setPicture1Charged] = useState(false);
    const [picture1Error, setPicture1Error] = useState(false);

    const [picture2Charged, setPicture2Charged] = useState(false);
    const [picture2Error, setPicture2Error] = useState(false);

    const [picture3Charged, setPicture3Charged] = useState(false);
    const [picture3Error, setPicture3Error] = useState(false);

    const [errors, setErrors] = useState({});

    const {
        id,
        name,
        products_category_id,
        barcode,
        description,
        price,
        unit,
        stock,
        picture_1,
        picture_2,
        picture_3,
        availability,
        onInputChange,
        onUpdateForm,
    } = useForm({
        id: '',
        name: '',
        products_category_id: '',
        barcode: '',
        description: '',
        price: '',
        unit: '',
        stock: '',
        picture_1: '',
        picture_2: '',
        picture_3: '',
        availability: '',
    });

    useEffect(() => {

        const genericRequest = new Generics();

        // Get products categories
        genericRequest.getData(`${APIUrl}${apiVersion}${products.categories.index}`, token)
            .then(resp => {
                setCategories(resp.data);
            });

        // Get units
        genericRequest.getData(`${APIUrl}${apiVersion}${products.units.index}`, token)
            .then(resp => {
                setUnits(resp.data);
            });

        (new Products()).getData(
            `${APIUrl}${apiVersion}${products.show}/${slug}`,
            token,
        ).then(resp => {
                const data = resp.data.data;
                onUpdateForm({
                    id: data.id,
                    name: data.name,
                    products_category_id: data.products_category_id,
                    barcode: data.barcode,
                    description: data.description,
                    price: data.price,
                    unit: data.unit,
                    stock: data.stock,
                    picture_1: data.picture_1,
                    picture_2: data.picture_2,
                    picture_3: data.picture_3,
                    availability: data.availability,
                });
            });
    }, []);

    useEffect(() => {
        if (picture_1.type !== 'image/jpeg' && picture_1.type !== 'image/png') {
            if (typeof picture_1 === 'string') {
                if(picture_1.includes(APIUrl)) {
                    if (picture_1 !== `${APIUrl}${products.imagesPath}`) {
                        document.getElementById('show_picture_1').src = picture_1;
                        setPicture1Charged(true);
                        setPicture1Error(false);
                    }
                }
            } else {
                setPicture1Charged(false);
                setPicture1Error(true);
            }
            onInputChange({
                target: {
                    name: 'picture_1',
                    value: '',
                }
            });
            document.getElementById('picture_1').value = '';
        } else {
            const readerImage = new FileReader;
            readerImage.readAsDataURL(picture_1);
            readerImage.addEventListener('load', event => {
                const routeImage = event.target.result;
                document.getElementById('show_picture_1').src = routeImage;
                setPicture1Charged(true);
                setPicture1Error(false);
            });
        }
    }, [picture_1]);

    useEffect(() => {
        if (picture_2.type !== 'image/jpeg' && picture_2.type !== 'image/png') {
            if (typeof picture_2 === 'string') {
                if(picture_2.includes(APIUrl)) {
                    if (picture_2 !== `${APIUrl}${products.imagesPath}`) {
                        document.getElementById('show_picture_2').src = picture_2;
                        setPicture2Charged(true);
                        setPicture2Error(false);
                    }
                }
            } else {
                setPicture2Charged(false);
                setPicture2Error(true);
            }
            onInputChange({
                target: {
                    name: 'picture_2',
                    value: '',
                }
            });
            document.getElementById('picture_2').value = '';
        } else {
            const readerImage = new FileReader;
            readerImage.readAsDataURL(picture_2);
            readerImage.addEventListener('load', event => {
                const routeImage = event.target.result;
                document.getElementById('show_picture_2').src = routeImage;
                setPicture2Charged(true);
                setPicture2Error(false);
            });
        }
    }, [picture_2]);

    useEffect(() => {
        if (picture_3.type !== 'image/jpeg' && picture_3.type !== 'image/png') {
            if (typeof picture_3 === 'string') {
                if(picture_3.includes(APIUrl)) {
                    if (picture_3 !== `${APIUrl}${products.imagesPath}`) {
                        document.getElementById('show_picture_3').src = picture_3;
                        setPicture3Charged(true);
                        setPicture3Error(false);
                    }
                }
            } else {
                setPicture3Charged(false);
                setPicture3Error(true);
            }
            onInputChange({
                target: {
                    name: 'picture_3',
                    value: '',
                }
            });
            document.getElementById('picture_3').value = '';
        } else {
            const readerImage = new FileReader;
            readerImage.readAsDataURL(picture_3);
            readerImage.addEventListener('load', event => {
                const routeImage = event.target.result;
                document.getElementById('show_picture_3').src = routeImage;
                setPicture3Charged(true);
                setPicture3Error(false);
            });
        }
    }, [picture_3]);

    const onFileChange = (event) => {
        onInputChange({
            target: {
                name: event.target.name,
                value: event.target.files[0],
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();

        (new Products()).update(
            id,
            name,
            products_category_id,
            barcode,
            description,
            price,
            unit,
            stock,
            picture_1,
            picture_2,
            picture_3,
            availability,
            token,
        ).then( resp => {
            switch (resp.statusText) {
                case 'Unprocessable Content':
                    setErrors(resp.errors);
                    break;
                case 'OK':
                    setAlert(true);
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 5000);
                    break;
            }
        });
    }

    return (
        <Container>
            {
                alert &&
                <div className={`fixed bottom-4 right-4 animate__animated ${ showAlert ? "animate__fadeInRight" : "animate__fadeOutRight" } bg-green-600/60 text-white font-semibold rounded-md px-5 py-3`}>
                    Actualizado correctamente
                </div>
            }
            <h3 className="ml-10 mb-5 text-xl font-semibold">
                Actualizar producto
            </h3>
            <div className="flex flex-col justify-center items-center gap-5">
                <div className="w-full sm:w-11/12 bg-white rounded-lg px-2 sm:px-5 md:px-10 py-6 shadow-lg flex flex-col justify-center items-center gap-5">
                    <form onSubmit={onSubmit} className="flex flex-col justify-center items-center gap-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                            <div className="col-span-1 md:col-span-2">
                            <ErrorMessage>{errors.message}</ErrorMessage>
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="name">
                                        Nombre
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.name}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="text" 
                                    name="name"
                                    value={name}
                                    onChange={onInputChange}
                                    // required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="products_category_id">
                                        Categoría del producto
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.products_category_id}
                                    </ErrorMessageMini>
                                </div>
                                <select
                                    name="products_category_id"
                                    className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                    value={products_category_id}
                                    onChange={onInputChange}
                                    // required
                                >
                                    <option value="">Seleccionar...</option>
                                    {   categories.length != 0 &&
                                        categories.map(category => {
                                            return (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="barcode">
                                        Código de barras
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.barcode}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="text" 
                                    name="barcode"
                                    value={barcode}
                                    onChange={onInputChange}
                                    // required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="price">
                                        Precio
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.price}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="number" 
                                    name="price"
                                    value={price}
                                    onChange={onInputChange}
                                    // required={true}
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="unit">
                                        Unidad
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.unit}
                                    </ErrorMessageMini>
                                </div>
                                <select
                                    name="unit"
                                    className="border border-gray-500 rounded-md px-5 py-2 placeholder:italic w-full"
                                    value={unit}
                                    onChange={onInputChange}
                                    // required
                                >
                                    <option value="">Seleccionar...</option>
                                    {   units.length != 0 &&
                                        units.map(unit => {
                                            return (
                                                <option key={unit.id} value={unit.code}>
                                                    {unit.name}
                                                </option>
                                            );
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="stock">
                                        Stock
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.stock}
                                    </ErrorMessageMini>
                                </div>
                                <BasicInput 
                                    type="number" 
                                    name="stock"
                                    value={stock}
                                    onChange={onInputChange}
                                    // required={true}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="">
                                        Descripción
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.description}
                                    </ErrorMessageMini>
                                </div>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={ description ? description : '' }
                                    onChange={ ( event, editor ) => {
                                        const eventGeneric = {
                                            target: {
                                                name: 'description',
                                                value: editor.getData(),
                                            }
                                        }
                                        onInputChange(eventGeneric);
                                    } }
                                />
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="picture_1">
                                        Foto principal
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.picture_1}
                                    </ErrorMessageMini>
                                </div>
                                <input
                                    type="file"
                                    name="picture_1"
                                    id="picture_1"
                                    onChange={onFileChange}
                                    className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                    file:bg-transparent file:border-0
                                    file:bg-gray-200 file:mr-4
                                    file:py-3 file:px-4
                                    file:cursor-pointer
                                    dark:file:bg-gray-700 dark:file:text-gray-400
                                    cursor-pointer"
                                    // required
                                />
                                <img
                                    id="show_picture_1"
                                    className={
                                        picture1Charged 
                                        ? "block mt-2 mx-auto w-48 h-48 object-cover object-center"
                                        : "hidden mt-2 mx-auto w-48 h-48 object-cover object-center"
                                    }
                                    src=""
                                    alt="product_image_1"
                                ></img>
                                {
                                    picture1Error &&
                                    <DangerInfoMini>
                                        Solo puede adjuntar imagenes de tipo JPG y PNG
                                    </DangerInfoMini>
                                }
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="picture_2">
                                        Foto alternativa 1
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.picture_2}
                                    </ErrorMessageMini>
                                </div>
                                <input
                                    type="file"
                                    name="picture_2"
                                    id="picture_2"
                                    onChange={onFileChange}
                                    className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                    file:bg-transparent file:border-0
                                    file:bg-gray-200 file:mr-4
                                    file:py-3 file:px-4
                                    file:cursor-pointer
                                    dark:file:bg-gray-700 dark:file:text-gray-400
                                    cursor-pointer"
                                    // required
                                />
                                <img
                                    id="show_picture_2"
                                    className={
                                        picture2Charged 
                                        ? "block mt-2 mx-auto w-48 h-48 object-cover object-center"
                                        : "hidden mt-2 mx-auto w-48 h-48 object-cover object-center"
                                    }
                                    src=""
                                    alt="product_image_2"
                                ></img>
                                {
                                    picture2Error &&
                                    <DangerInfoMini>
                                        Solo puede adjuntar imagenes de tipo JPG y PNG
                                    </DangerInfoMini>
                                }
                            </div>
                            <div className="col-span-1">
                                <div className="flex justify-between items-center gap-2">
                                    <BasicLabel htmlFor="picture_3">
                                        Foto alternativa 2
                                    </BasicLabel>
                                    <ErrorMessageMini>
                                        {errors.errors?.picture_3}
                                    </ErrorMessageMini>
                                </div>
                                <input
                                    type="file"
                                    name="picture_3"
                                    id="picture_3"
                                    onChange={onFileChange}
                                    className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                    file:bg-transparent file:border-0
                                    file:bg-gray-200 file:mr-4
                                    file:py-3 file:px-4
                                    file:cursor-pointer
                                    dark:file:bg-gray-700 dark:file:text-gray-400
                                    cursor-pointer"
                                    // required
                                />
                                <img
                                    id="show_picture_3"
                                    className={
                                        picture3Charged 
                                        ? "block mt-2 mx-auto w-48 h-48 object-cover object-center"
                                        : "hidden mt-2 mx-auto w-48 h-48 object-cover object-center"
                                    }
                                    src=""
                                    alt="product_image_3"
                                ></img>
                                {
                                    picture3Error &&
                                    <DangerInfoMini>
                                        Solo puede adjuntar imagenes de tipo JPG y PNG
                                    </DangerInfoMini>
                                }
                            </div>
                        </div>
                        <MainButton type="submit">
                            Guardar
                        </MainButton>
                    </form>
                </div>
            </div>
        </Container>
    );
}

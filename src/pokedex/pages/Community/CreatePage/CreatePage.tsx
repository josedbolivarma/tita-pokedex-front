import React, { useState } from 'react'
import { BreadCrumb } from '../../../../shared'

import { object, string, number, array } from 'yup';

import { useNavigate } from 'react-router-dom';
import { Field, Formik } from 'formik';
import { FileUp } from '../../../../helpers';

import styles from "./CreatePage.module.css";
import { Layout } from '../../../layouts';
import { useFetchPokemons } from '../../../../hooks';
import { typeElements } from '../../../../types';
import { capitalize, getTypeColor, getTypeIcon } from '../../../../utils';

interface FormValuesUI {
    name: string;
    type: string[]; 
    generation: number;
    img: string;
    weight: string;
    height: string;
}

const SignupSchema = object().shape({
    name: string()
    .min(3, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required')
    .matches(/^[a-zA-Z0-9 ]*$/, 'No special characters are allowed'),
    type: array().of(string()).min(1, "The pokemon must have at least one type"),
    generation: number(),
    weight: string(),
    height: string(),
});

export default function CreatePage() {

  const [fileImage, setFileImage] = useState('');
  const { addPokemon } = useFetchPokemons();
  
  const navigate = useNavigate();

  const handleFileChange=(e: any)=>{
    const file = e.target.files[0]
    //el FileUp es la configuracion con cloudinary y le asigno la respuesta de cloudi a la foto
         FileUp(file)
         .then((resp: any)=>{
             setFileImage(resp);
         })
         .catch((error: any) =>{
             console.warn(error)
         })
 }

    const handleSubmit = (values: any) => {
        values.img = fileImage;
        const pokemon = {
            ...values,
            img: values.img
        }
        // dispatch(addFormikAsync(values));
        addPokemon(pokemon);
        navigate('/community');
    }

  const initialValues: FormValuesUI = {
    name: '',
    type: [],
    img: '',
    generation: 0,
    weight: '',
    height: '',
  };


  return (
    <section className='root color-black-bg'>

        <div className="container">
        <BreadCrumb name={"Create Your Pokemon"} />

        </div>
        
        <div className="w-100 h-100 mb-em-4 flex flex-col justify-content-center align-items-center">
        
        <Layout size='md'>
        <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        handleSubmit(values)
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange, handleReset }) => (
        <form onSubmit={handleSubmit} className='w-100 h-100 flex flex-col gap-16 justify-content-center align-items-center '
        >
                <h1 className='color-black'>Create Your Pokemon</h1>

        <img className={styles.pokemon_img} src={fileImage ? fileImage : "https://res.cloudinary.com/duzncuogi/image/upload/v1727226113/tita-pokedex/assets/icons/who_is_this_pokemon_iyosk9.png"} alt="Your Pokemon" />

        <div className={styles.order__box}>
        {/* <label>Name</label> */}
          <Field className="font-size-24" placeholder="Pokemon Name" name="name" />
          {errors.name && touched.name ? (
            <label className={styles.mark}>{errors.name}</label>
          ) : null}
        </div>

        <div className={styles.order__box}>
        {/* <label>Types</label> */}
        <div className='flex gap-16' role="group" aria-labelledby="checkbox-group">
          {
            typeElements.map(({name}: {name: string}, index: number) => (
              <label key={`${index}-${name}`} className='flex flex-col align-items-center gap-4'>
              <Field className="display-none" type="checkbox" name="type" value={name} />
                <img className={`${styles.type_icon}`} style={{ background: values?.type?.includes(name) ? getTypeColor(name) : "#F2F2F2" }} src={getTypeIcon(name)} alt="Grass Type" />
              <span>{capitalize(name)}</span>
            </label>
            ))
          }
          </div>
          

          {/* <Field placeholder="Types" name="types" /> */}
          {errors.type && touched.type ? (
            <span className={styles.mark}>{errors.type}</span>
          ) : null}
        </div>
        <div className={styles.order__box}>
        {/* <label>Generation</label> */}
          <Field placeholder="Generation" name="generation" />
          {errors.generation && touched.generation ? (
            <span className={styles.mark}>{errors.generation}</span>
          ) : null}
        </div>
        <div className={styles.order__box}>
        {/* <label>Weight</label> */}
          <Field placeholder="Weight" name="weight" />
          {errors.weight && touched.weight ? (
            <span className={styles.mark}>{errors.weight}</span>
          ) : null}
        </div>
        <div className={styles.order__box}>
        {/* <label>Height</label> */}
          <Field placeholder="Height" name="height" />
          {errors.height && touched.height ? (
            <span className={styles.mark}>{errors.height}</span>
          ) : null}
        </div>
          <Field onChange={handleFileChange} name="img" type="file" />
          {errors.img && touched.img ? <div>{errors.img}</div> : null}
     

          <button 
          className='btn btn-primary'
          type="submit">CREATE
          
          </button>
        </form>
      )}
    </Formik>
        </Layout>
        </div>

    </section>
  )
}

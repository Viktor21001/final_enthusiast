import React, { ChangeEvent, useState } from "react";
import { InputsType, fetchAddIdea, fetchIdeas } from "../../redux/ideaActions";
import { useAppDispatch } from "../../redux/hooks";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";
import { saveSaleBook } from "../../redux/malter";
import styles from "./NewIdea.module.css"; 

export default function NewIdea(): JSX.Element {
  const [inputs, setInputs] = useState<InputsType>({
    title: "",
    description: "",
    category: "",
    photo: null,
  });
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  console.log(inputs);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, files } = e.target;
    console.log(e.target, 'zzzzzzzzzzzzzz');
    
    if (name === 'photo') {
      const file = files?.[0];
      if (file) {
        setInputs((prev) => ({ ...prev, [name]: file }));
        const imageUrl = URL.createObjectURL(file);
        setPreviewImage(imageUrl);
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('здесь файл',inputs.photo);
    
    const data = new FormData();
    data.append('title', inputs.title)
    data.append('description', inputs.description)
    data.append('category', inputs.category)
    data.append('photo', inputs.photo)
    console.log(data);

    dispatch(saveSaleBook(data))
    navigate('/ideas');
    void dispatch(fetchIdeas());
  };



  const { login } = useUser()

  // const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  // };

  // const addIdea = async (): Promise<void> => {
  //   void dispatch(fetchAddIdea(inputs));
  //   setInputs({ title: "", description: "", category: "" });
  //   navigate('/ideas');
  // };

  return (
    <form onSubmit={handleSubmit}>
      {login ? (
        <>
        {previewImage ? (
      <img style={{ width: '150px' }} src={previewImage} alt="Предпросмотр" className={styles.previewImage}  />
    ) : (
      null
    )}
        
        <br/>
        <h2>Create your idea!</h2>
        <input
            onChange={changeHandler}
            type="text"
            name="title"
            value={inputs.title}
            className={styles.inputField}
            placeholder="Title"
          />
          <input
            onChange={changeHandler}
            type="text"
            name="description"
            value={inputs.description}
            className={styles.inputField}
            placeholder="Description"
          />
          <select
            name="category"
            onChange={changeHandler}
            value={inputs.category}
            className={styles.selectField}
          >
            <option value="">Select a category</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="art">Art</option>
          </select>
          <input type="file" name="photo" onChange={handleChange} className='inputSalon'/>
          <br/>
          <button type="submit" className={styles.addButton}>
            Add idea
          </button>
        </>
      ) : (
        <>
        </>
      )}
    </form>
  );

  // return (
  //   <div>
  //     {login ? (
  //       <>
  //     <form>
  //       <input
  //         onChange={changeHandler}
  //         type="text"
  //         name="title"
  //         value={inputs.title}
  //       />
  //       <input
  //         onChange={changeHandler}
  //         type="text"
  //         name="description"
  //         value={inputs.description}
  //       />
  //         <select name="category" onChange={changeHandler} value={inputs.category}>
  //         <option value="">Select a category</option>
  //         <option value="technology">Technology</option>
  //         <option value="business">Business</option>
  //         <option value="art">Art</option>
  //       </select>
  //       <button onClick={addIdea} type="button">
  //         Add
  //       </button>
  //     </form>
  //       </>
  //     ) : (
  //       <>
  //       </>
  //     )}
  //   </div>
  // );
}
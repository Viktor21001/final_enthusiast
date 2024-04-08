// import React, { ChangeEvent, useState } from "react";
// import { useAppDispatch } from "../../redux/hooks";
// import { InputsType, fetchAddStartUp, fetchStartUps } from "../../redux/startUpActions";
// import { NavigateFunction, useNavigate } from "react-router-dom";
// import { useUser } from "../../UserContext";
// import { saveSaleBook } from "../../redux/muterStaptup";

// export default function NewStartUp(): JSX.Element {
//   const [inputs, setInputs] = useState<InputsType>({
//     startUpTitle: "",
//     startUpDescription: "",
//     startUpCategory: "",
//     progress: 0,
//     currentAmount: 0,
//     targetAmount: 0,
//     photos: null,
//   });

//   const { login } = useUser()

//   const dispatch = useAppDispatch();
//   const navigate: NavigateFunction = useNavigate();
//   const [previewImage, setPreviewImage] = useState<string | null>(null);

//   const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
//     const { name, files } = e.target;
//     console.log(e.target, 'zzzzzzzzzzzzzz');

//     if (name === 'photos') {
//       const file = files?.[0];
//       if (file) {
//         setInputs((prev) => ({ ...prev, [name]: file }));
//         const imageUrl = URL.createObjectURL(file);
//         setPreviewImage(imageUrl);
//       }
//     }
//   }
//   const addStartUp = async (e): Promise<void> => {
//     e.preventDefault();
//     void dispatch(fetchAddStartUp(inputs));

//     const data = new FormData();
//     data.append('title', inputs.startUpTitle)
//     data.append('description', inputs.startUpDescription)
//     data.append('category', inputs.startUpCategory)
//     data.append('progress', inputs.progress)
//     data.append('currentAmount', inputs.currentAmount)
//     data.append('targetAmount', inputs.targetAmount)
//     data.append('photos', inputs.photos)
//     console.log(data);

//     dispatch(saveSaleBook(data))
//     setInputs({
//       startUpTitle: "",
//       startUpDescription: "",
//       startUpCategory: "",
//       progress: 0,
//       currentAmount: 0,
//       targetAmount: 0,
//     });
//     navigate('/');
//     void dispatch(fetchStartUps());

//   };

//   return (
//     <div>
//       { login ? (
//        <>
//       <form>
//       {previewImage ? (
//       <img style={{ width: '150px' }} src={previewImage} alt="Предпросмотр" className="previewImage" />
//     ) : (
//       null
//     )}
//       <input type="file" name="photos" onChange={handleChange} className='inputSalon'/>
//         <input
//           onChange={changeHandler}
//           type="text"
//           name="startUpTitle"
//           value={inputs.startUpTitle}
//           placeholder="title"
//         />
//         <input
//           onChange={changeHandler}
//           type="text"
//           name="startUpDescription"
//           value={inputs.startUpDescription}
//           placeholder="description"
//         />
//          <input
//           onChange={changeHandler}
//           type="number"
//           name="progress"
//           value={inputs.progress}
//           placeholder="progress"
//         />
//          <input
//           onChange={changeHandler}
//           type="number"
//           name="currentAmount"
//           value={inputs.currentAmount}
//           placeholder="current budget"
//         />
//            <input
//           onChange={changeHandler}
//           type="number"
//           name="targetAmount"
//           value={inputs.targetAmount}
//           placeholder="target sum"
//         />
//         <select
//           name="startUpCategory"
//           onChange={changeHandler}
//           value={inputs.startUpCategory}
//           aria-placeholder="category"
//         >
//           <option value="">Select a category</option>
//           <option value="technology">Technology</option>
//           <option value="business">Business</option>
//           <option value="art">Art</option>
//         </select>
//         <button onClick={addStartUp} type="button">
//           Add
//         </button>
//       </form>
//        </>
//       ) : (
//         <>
//         </>
//       )}
//     </div>
//   );
// }

import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { saveSaleBook } from '../../redux/muterStaptup';
import { useUser } from '../../UserContext';
import styles from "./NewStartup.module.css"; 


interface InputsType {
  startUpTitle: string;
  startUpDescription: string;
  startUpCategory: string;
  progress: string;
  currentAmount: string;
  targetAmount: string;
  photos: FileList | null;
}

export default function NewStartUp(): JSX.Element {
  const [inputs, setInputs] = useState<InputsType>({
    startUpTitle: '',
    startUpDescription: '',
    startUpCategory: '',
    progress: '',
    currentAmount: '',
    targetAmount: '',
    photos: null,
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const { login } = useUser();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value, files } = e.target;
    if (name === 'photos' && files) {
      setInputs((prev) => ({ ...prev, [name]: files }));
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(imageUrls);
    } else {
      setInputs((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addStartUp = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('startUpTitle', inputs.startUpTitle);
    formData.append('startUpDescription', inputs.startUpDescription);
    formData.append('startUpCategory', inputs.startUpCategory);
    formData.append('progress', inputs.progress);
    formData.append('currentAmount', inputs.currentAmount);
    formData.append('targetAmount', inputs.targetAmount);

    if (inputs.photos) {
      Array.from(inputs.photos).forEach((file) => {
        formData.append('photos', file);
      });
    }

    await dispatch(saveSaleBook(formData));
    setInputs({
      startUpTitle: '',
      startUpDescription: '',
      startUpCategory: '',
      progress: '',
      currentAmount: '',
      targetAmount: '',
      photos: null,
    });
    setPreviewImages([]);
    navigate('/');
  };

  return (
    <div>
      {login ? (
        <form>
          {previewImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Preview"
              style={{ width: '100px', height: '100px' }}
              className={styles.previewImage} 
            />
          ))}
      
                  <h2>Create your startup!</h2>

          <input
            type="text"
            name="startUpTitle"
            value={inputs.startUpTitle}
            onChange={handleChange}
            placeholder="Title"
            className={styles.inputField}
          />
          <input
            type="text"
            name="startUpDescription"
            value={inputs.startUpDescription}
            onChange={handleChange}
            placeholder="Description"
            className={styles.inputField}
          />
          <input
            type="text"
            name="startUpCategory"
            value={inputs.startUpCategory}
            onChange={handleChange}
            placeholder="Category"
            className={styles.inputField}
          />
          <input
            type="text"
            name="progress"
            value={inputs.progress}
            onChange={handleChange}
            placeholder="Progress"
            className={styles.inputField}
          />
          <input
            type="text"
            name="currentAmount"
            value={inputs.currentAmount}
            onChange={handleChange}
            placeholder="Current Amount"
            className={styles.inputField}
          />
          <input
            type="text"
            name="targetAmount"
            value={inputs.targetAmount}
            onChange={handleChange}
            placeholder="Target Amount"
            className={styles.inputField}
          />
            <input
            type="file"
            name="photos"
            onChange={handleChange}
            multiple
            // className={styles.inputField}
          />
          <button type="button" onClick={addStartUp} className={styles.addButton}>
            Add Startup
          </button>
        </form>
      ) : (
        <p>Please log in to add a startup.</p>
      )}
    </div>
  );
}

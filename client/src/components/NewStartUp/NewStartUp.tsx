import React, { ChangeEvent, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { useUser } from '../../UserContext';
import styles from './NewStartup.module.css';
import {
  InputsType,
  fetchAddStartUp,
  fetchStartUps,
} from '../../redux/startUpActions';

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

  const [previewImages, setPreviewImages] = useState<string | null>(null);
  const { login } = useUser();
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

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

    await dispatch(fetchAddStartUp(formData));
    await dispatch(fetchStartUps());
    navigate('/');
  };

  return (
    <div>
      {login ? (
        <form className={styles.container}>
          {previewImages ? (
            <img
              style={{ width: '150px' }}
              src={previewImages}
              alt="Предпросмотр"
              className={styles.previewImage}
            />
          ) : null}

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
          <br />
          <input
            type="file"
            name="photos"
            className="addImg"
            onChange={handleChange}
            multiple
          />
          <button
            type="button"
            onClick={addStartUp}
            className={styles.addButton}
          >
            Add Startup
          </button>
        </form>
      ) : (
        <p>Please log in to add a startup.</p>
      )}
    </div>
  );
}

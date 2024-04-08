const startupRouter = require('express').Router();
const uploadMid = require('../../file');
const { StartUp, User } = require('../../db/models');

startupRouter.get('/', async (req, res) => {
  try {
    const startUps = await StartUp.findAll({
      raw: true,
      include: {
        model: User,
        attributes: ['login'], // может лучше будет не логин а ФИО
      },
    });
    res.json(startUps);
  } catch (error) {
    console.log(error);
  }
});

startupRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const startUp = await StartUp.findOne({
      where: { id },
      raw: true,
      include: {
        model: User,
        attributes: ['login'],
      },
    });
    res.json(startUp);
  } catch (error) {
    console.log(error);
  }
});

startupRouter.post('/new', uploadMid.single('photos'), async (req, res) => {
  const { userId } = req.session;
  const startUpData = req.body;
  startUpData.userId = userId;
  try {
    let photos = 'sadMax.jpg';
    if (req.file) {
      photos = req.file.originalname;
    }
    startUpData.photos = photos;
    const startUp = await StartUp.create(startUpData);
    res.json(startUp);
  } catch (error) {
    console.log(error);
  }
});

startupRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await StartUp.destroy({ where: { id } });
    res.json({ msg: 'deleted' });
  } catch (error) {
    console.log(error);
  }
});

startupRouter.patch('/:id', async (req, res) => {
  const startUp = await StartUp.findByPk(req.params.id);
  await startUp.update(req.body);
  res.json(startUp);
});

startupRouter.post('/funding/:id', async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body; // Тут нужно на клинете передать сумму!!!
  // console.log(amount);
  try {
    const startup = await StartUp.findByPk(id);
    if (!startup) {
      return res.status(404).json({ error: 'Startup not found' });
    }

    if (amount.isNaN || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    await startup.increment('currentAmount', { by: amount });

    res.json({ status: 'done', startup_balance: startup.currentAmount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = startupRouter;



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

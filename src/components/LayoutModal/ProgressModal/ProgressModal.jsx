/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import * as S from "./styles";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import ButtonMain from "../../ButtonMain/ButtonMain";
import { idSelector } from "../../../store/selectors/user";
import InputProgress from "../InputProgress/InputProgress";
import { updateProgress } from "../../../Api/progressApi";
import { useState } from "react";
// import { addProgress } from "../../../Api";
// import { getUserProgress, postProgress, getProgress } from "../../../Api";
// import { courseList } from "../../../store/selectors/coursesNew";
// import { userProgress } from "../../../store/selectors/progress";

export  function ProgressModal  ({ exercises, onClick, course, workout })  {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [complete, setComplete] = useState({});
  const userId = useSelector(idSelector);
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: {
        done: e.target.value,
        goal: e.target.id,
      },
    });
    if (e.target.value >= Number(e.target.id)) {
      setComplete({
        ...complete,
        [e.target.name]: { done: 'complete' },
      });
    }
  };
  const onSubmit = async (data) => {
    const progress = {};

    // Собираем данные о прогрессе из инпутов
    exercises.forEach((exercise, index) => {
      const exerciseNumber = index + 1;
      const exerciseId = `${workout[0]._id}_exercise${exerciseNumber}`;

      // Значение прогресса из соответствующего инпута
      const exerciseProgress = parseInt(data[`exercise_${exerciseId}`], 10) || 0;

      // Заполняем объект progress
      progress[exerciseId] = exerciseProgress;
    });

    // Добавляем или обновляем прогресс в базе данных
    for (let i = 0; i < exercises.length; i++) {
      const exerciseNumber = i + 1;
      const exerciseId = `${workout[0]._id}_exercise${exerciseNumber}`;
      const exerciseProgress = progress[exerciseId];

      await updateProgress(userId, workout[0]._id, exerciseNumber, exerciseProgress);
    }
    // Диспетчим действие добавления прогресса в Redux (если это нужно)
    // dispatch(
    //   addProgress({
    //     workoutId: workout._id,
    //     progress: progress
    //   })
    // );

    onClick(); // Закрываем модальное окно или делаем что-то еще
  };
  

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  //const courses = useSelector(courseList);

  // const addUserProgress = (data) => {
  //   const progress = getUserProgress(data, exercises);

  //   dispatch(
  //     addProgress({
  //       workoutId: workout._id,
  //       progress: progress
  //     })
  //   );
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm();

  // const onSubmit = async (data) => {
  //   addUserProgress(data);
  //   onClick();
  // };
  return (
    <S.FormModal onSubmit={handleSubmit(onSubmit)}>
      <S.TitleModal>Мой прогресс</S.TitleModal>
      <S.InputsModal>
        {exercises?.map((exercise, index) => (
          <S.InputText key={exercise.name}
          >
            {`Сколько раз вы сделали упражнение "${exercise.name.split("(")[0]}" ?`}
            <InputProgress
              name={`exercise_${workout[0]._id}_exercise${index + 1}`}
              register={register}
              errors={errors}
              onChange={onChange}
            />
          </S.InputText>
        ))}
      </S.InputsModal>
      <ButtonMain type="submit" content="Отправить" />
    </S.FormModal>
  );
};
export default ProgressModal;
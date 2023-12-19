import * as S from "./styles";

export const ProgressExercises = ({ exercises }) => {
  // getProgressInPercent = ({ exercises }) => {
  // const getDone = ({ exercise, needed }) => {
  //   const done = exercise.progress?.find((item) => item.id === userId)[0];
  //   console.log(done);
  //   let result = (done / needed) * 100;
  //   if (result > 100) {
  //     result = 100;
  //   }
  //   return result;
  // };
  // console.log(exercises);

  return (
    <S.Progress>
      <S.Title>Мой прогресс по тренировке:</S.Title>
      <S.ListExercises>
        {exercises?.map((exercise, i) => {
          const percent = 0;

          return (
            <S.ListItem key={i + 1}>
              <S.NameExercise>{exercise.name.split("(")[0]}</S.NameExercise>
              <S.ProgressBar>
                <S.Done style={{ width: `${percent}%` }}></S.Done>
                <S.Percent
                  style={{
                    left: `${percent}px`,
                    color: percent > 0 ? "#fff" : "#000"
                  }}>
                  {percent}%
                </S.Percent>
              </S.ProgressBar>
            </S.ListItem>
          );
        })}
      </S.ListExercises>
    </S.Progress>
  );
};

export default ProgressExercises;

/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import * as S from "./Style";
import { getCourses, getCourses2, getWorkouts } from "../../Api";
export const Courses = () => {
  //для проверки гет запроса
  const [courses, setСourses] = useState([]);

  useEffect(() => {
    getCourses()
      .then((data) => {
        setСourses(data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const name = courses.map((course) => course.nameRu);
  // console.log(name);
  return (
    <S.Courses>
      <S.CourseYoga>
        <S.CourseName>Йога</S.CourseName>
      </S.CourseYoga>
      <S.CourseStrech>
        <S.CourseName>Стретчинг </S.CourseName>
      </S.CourseStrech>
      <S.CourseDance>
        <S.CourseName>Танцевальный фитнес</S.CourseName>
      </S.CourseDance>
      <S.CourseStep>
        <S.CourseName>Степ-аэробика</S.CourseName>
      </S.CourseStep>
      <S.CourseBodyflex>
        <S.CourseName> Бодифлекс</S.CourseName>
      </S.CourseBodyflex>
    </S.Courses>
  );
};

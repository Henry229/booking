import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid'; 


export const calendarInit = () => {
  const date = new Date();
  // const [calendar, setCalendar] = useState('') 
  // const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
  // const aestGap = 10 * 60 * 60 * 1000;
  // const today = new Date(utc + aestGap);
  
  // const thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  // console.log('###thisMonth: ', thisMonth);
  
  const currentYear = date.getFullYear(); // 달력에서 표기하는 연
  const currentMonth = date.getMonth(); // 달력에서 표기하는 월
  const currentDate = date.getDate(); // 달력에서 표기하는 일
  const currentDay = date.getDay(); // 요일
  const totalDay = [];
  
  // const endDay = new Date(currentYear, 5, 30);
  // const startDay = new Date(currentYear, 5, 31);
  // const otherDay = new Date(currentYear, 6, 0);
  // console.log("Starting day: ",startDay,'/ otherDay: ',otherDay, '/endDay: ',endDay);
  // let {id, year, month, day} = totalDay;ㅌㄴ
  // for (let year = currentYear -1; year <= currentYear; year++) {
    for ( let fmonth = 0; fmonth <= 11; fmonth++) {
      const lastDate = new Date(currentYear, fmonth+1, 0).getDate();
      for ( let fday = 1; fday <= lastDate; fday++) {
        let forDate = new Date(currentYear, fmonth, fday);
        let theYear = forDate.getFullYear();
        let theMonth = forDate.getMonth();
        let theDate = forDate.getDate();
        let theDay = forDate.getDay();
        let newDay = {
          id: uuidV4(),
          year: theYear,
          month: theMonth + 1,
          date: theDate,
          // day: theDay,  
        };
        switch(theDay) {
          case 0:
            newDay.day = 'SUN';
            break;
          case 1:
            newDay.day = 'MON';
            break;
          case 2:
            newDay.day = 'TUE';
            break;
          case 3:
            newDay.day = 'WED';
            break;
          case 4:
            newDay.day = 'THU';
            break;
          case 5:
            newDay.day = 'FRI';
            break;
          case 6:
            newDay.day = 'SAT';
            break;
          default: 
            throw new Error(`Invalid date: ${theDay}`);
        }

        
        totalDay.push(newDay);
        // totalDay = {...totalDay, ...newDay};
        // console.log(">>today object : ", totalDay);
        
        
      }
    }
  // let pickDay = [];
  // for (let index = 0; index < totalDay.length; index++) {
  //   const number = totalDay[index].toString();
  //   // console.log(number);
  //   const Samnumber = number.split(' ').slice(0,4);
  //   pickDay.push(Samnumber);
  //   // const {day, month, date, year} = obj;
  // };

  // pickDay = [...new Set(pickDay.map(JSON.stringify))].map(JSON.parse);
  // const com_day = {...pickDay};
  // console.log(">>com_day: ", com_day);
  // const set = new Set(totalDay);
  // const real_totalDay = [...set];
  // console.log("day: ", real_totalDay);
  // const prevDate = startDay.getDate();
  // const prevDay = startDay.getDay();

  // console.log('>> date: ',date,'/utc:',utc,' today: ',today, ' thisMonth: ',thisMonth);
  // console.log(`currentYear : ${currentYear}/ currentMonth : ${currentMonth}/ currentDate : ${currentDate}`);
  // console.log(`startDay : ${startDay}/ prevDate : ${prevDate}/ prevDay : ${prevDay}`);
  return totalDay;
};



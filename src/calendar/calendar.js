import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid'; 


export const calendarInit = () => {
  const date = new Date();
  
  const currentYear = date.getFullYear(); // 달력에서 표기하는 연
  const currentMonth = date.getMonth(); // 달력에서 표기하는 월
  const currentDate = date.getDate(); // 달력에서 표기하는 일
  const currentDay = date.getDay(); // 요일
  const totalDay = [];
  
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
      }
    }
  return totalDay;
};



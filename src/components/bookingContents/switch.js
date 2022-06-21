
export const DaySwitch = (value) => {
  let fullDay = "";
  console.log("value: ", value);
  switch ( value.day ) {
    case 'SUN':
      fullDay = "SUNDAY";
      break;
    case 'MON':
      fullDay = "MONDAY";
      break;
    case 'TUE':
      fullDay = "TUESDAY";
      break;
    case 'WED':
      fullDay = "WEDNESDAY";
      break;
    case 'THU':
      fullDay = "THURSDAY";
      break;
    case 'FRI':
      fullDay = "FRIDAY";
      break;
    case 'SAT':
      fullDay = "SATURDAY";
      break;
  };
  return fullDay;
};

export const MonthSwitch = (value) => {
  let fullMonth = "";
  switch ( value.month ) {
    case 1:
      fullMonth = "JANUARY";
      break;
    case 2:
      fullMonth = "FEBRUARY";
      break;
    case 3:
      fullMonth = "MARCH";
      break;
    case 4:
      fullMonth = "APRIL";
      break;
    case 5:
      fullMonth = "MAY";
      break;
    case 6:
      fullMonth = "JUNE";
      break;
    case 7:
      fullMonth = "JULY";
      break;
    case 8:
      fullMonth = "AUGUST";
      break;
    case 9:
      fullMonth = "SEPTEMBER";
      break;
    case 10:
      fullMonth = "OCTOBER";
      break;
    case 11:
      fullMonth = "NOVEMBER";
      break;
    case 12:
      fullMonth = "DECEMBER";
      break;
  };
  return fullMonth;
}
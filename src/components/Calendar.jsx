import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';

function Calendar(props) {
  const [data, setData] = useState(dayjs(new Date()));

  return (
    <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar onChange={(newValue) => console.log(newValue.$d)} />
        </LocalizationProvider>
    </div>
    
  );
}

export default Calendar;

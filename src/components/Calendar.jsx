import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function Calendar(props) {
  const { setSelectDate } = props;
  const handleChangeDate = (newValue) => {
    setSelectDate(newValue);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar onChange={(newValue) => handleChangeDate(newValue.$d)} />
      </LocalizationProvider>
    </div>
  );
}

export default Calendar;

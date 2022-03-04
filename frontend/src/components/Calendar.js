import DatePicker from "react-datepicker";
import { Wrapper } from "./styles/Calendar.styled";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css'




export default function Calendar() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
   
    return (
        <Wrapper>
    
        <DatePicker
          selected={startDate}
          selectsStart
          startDate={startDate}
          placeholderText="Start Date"
          endDate={endDate}
          onChange={date => setStartDate(date)}
        />
        <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          placeholderText="End Date"
          endDate={endDate}
          minDate={startDate}
          onChange={date => setEndDate(date)}
        />
    
      </Wrapper>
    );
}




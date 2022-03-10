import React , {useState } from 'react'
import { NdviData} from './Data';
//import { ChartStyled} from "./styles/Chart.styled";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { ChartStyled } from './styles/Chart.styled';

function Chart() {
    const [ndviData, setNdviData] = useState({
        labels: NdviData.map((data) => data.Month),
        datasets: [
          {
            label: "NDVI TREND",
            data: NdviData.map((data) => data.NDVI),
            
            borderColor: "#2c912c",
            borderWidth: 2,
          },
        ],
      });
    
      // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT
    
      return (
        <ChartStyled>
          
         
          <Line data= {ndviData} />
          
          
          </ChartStyled>
      );
}

export default Chart
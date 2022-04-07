import React , {useState ,useEffect} from 'react'
import { NdviData} from './Data';
//import { ChartStyled} from "./styles/Chart.styled";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { ChartStyled } from './styles/Chart.styled';




function Chart({showimage, adm1RsData}) {
  if ( Object.keys(adm1RsData).length !== 0){
   const NdviData = [
    {
        "Time": 1617264611524,
        "NDVI": 0.4804017856942116
    },
    {
        "Time": 1617264608338,
        "NDVI": 0.48811391852795977
    }]
    console.log(adm1RsData.time_series, 'test time series')
  }
  // console.log(showimage)
  // console.log(adm1RsData.time_series, 'test time series')
  
    const [ndviData, setNdviData] = useState({

      
        labels: NdviData.map((data) => data.Time),
        datasets: [
          {
            label: "NDVI TREND",
            data: NdviData.map((data) => data.NDVI),
            
            borderColor: "#2c912c",
            borderWidth: 2,
          },
        ],
      },[adm1RsData]);


      // convert time stamp to human readable 

      const humanReadableDate = (time)=> {
      if (time !=='SeasonNDVI'){
        var date = new Date(time);
          
        var Day = date.getDate().toString().length ==2 ? date.getDate() : `0${date.getDate()}`


        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var formatedMonth = month.toString().length ==2 ? month : `0${month}`
        // console.log(date, month,Day, 'y', year)

        
        //template string

        var actualDate = `${Day}-${formatedMonth}-${year}`

      } else {
        actualDate = 'Average Season'
      }
        

        return actualDate
      }

     const newChart = () =>{

      
          const dynamicdata = adm1RsData.time_series

          const the_chart = {

      
            labels: dynamicdata.map((data) => humanReadableDate(data.Time)),
            datasets: [
              {
                label: "NDVI TREND",
                data: dynamicdata.map((data) => data.NDVI),
                
                borderColor: "#2c912c",
                borderWidth: 2,
              },
            ],
          }

        setNdviData(the_chart)
      }
    
      // IF YOU SEE THIS COMMENT: I HAVE GOOD EYESIGHT


      useEffect(()=> {
        if ( Object.keys(adm1RsData).length !== 0){
          newChart()
        }
      
        
     
       }, [adm1RsData])
    
      return (
        <ChartStyled>
          
         
          <Line data= {ndviData} />
          
          
          </ChartStyled>
      );
}

export default Chart
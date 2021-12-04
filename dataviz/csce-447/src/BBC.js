import React from 'react';
import {Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend,} from 'chart.js';
import { Bubble } from 'react-chartjs-2';
import Faker from 'faker';
import * as d3 from "d3";
import {Navbar,yearval} from "./Navbar.js";



var datatest = d3.csv(process.env.PUBLIC_URL + '/data/CleanedData.csv')
console.log('data', datatest)


ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    x: {
        grid:{
         display:false
             }
       },
    y: 
       {
     grid:{
      display:false
          }
       }
           }
}

export const data = {
  datasets: [
    {
      label: 'Red dataset',
      data: Array.from({ length: 50 }, () => ({
        x: Faker.datatype.number({ min: -100, max: 100 }),
        y: Faker.datatype.number({ min: -100, max: 100 }),
        r: Faker.datatype.number({ min: 5, max: 20 }),
      })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Blue dataset',
      data: Array.from({ length: 50 }, () => ({
        x: Faker.datatype.number({ min: -100, max: 100 }),
        y: Faker.datatype.number({ min: -100, max: 100 }),
        r: Faker.datatype.number({ min: 5, max: 20 }),
      })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function BBC() {
  console.log('year', yearval);
  return <Bubble options={options} data={data} redraw = {true} responsive = {true} />;
}


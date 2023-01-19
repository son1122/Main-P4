import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {WordCloud} from '@ant-design/plots';

const Word = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/antv-keywords.json')
            .then((response) => response.json())
            .then((json) => setData([{"value": 5, "name": "Fried Rice"},
                {"value": 5, "name": "Pad Kra Pao"},
                {"value": 7, "name": "Tom Yum Kun"},
                {"value": 10, "name": "Burger King"},
                {"value": 9, "name": "Panera Bread"},
                {"value": 8, "name": "In-N-Out"},
                {"value": 6, "name": "Jack In The Box"},
                {"value": 6, "name": "Five Guys"},
                {"value": 6, "name": "Chipotle"},
                {"value": 10, "name": "McDonalds"},
                {"value": 10, "name": "KFC"},
                {"value": 7, "name": "Jamba Juice"},
                {"value": 8, "name": "Chick-fil-A"},
                {"value": 11, "name": "Starbucks"},
                {"value": 8, "name": "Taco Bell"},
                {"value": 8, "name": "Dairy Queen"},
                {"value": 9, "name": "Subway"},
                {"value": 5, "name": "Sonic"},
                {"value": 5, "name": "Water"}]))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const config = {
        data,
        wordField: 'name',
        weightField: 'value',
        colorField: 'name',
        wordStyle: {
            fontFamily: 'Verdana',
            fontSize: [8, 32],
            rotation: 0,
        },
        random: () => 0.5,
    };

    return <WordCloud {...config} />;
};
export default Word

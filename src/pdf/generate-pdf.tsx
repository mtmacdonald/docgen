import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import {MyDocument} from './pdf';

ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);

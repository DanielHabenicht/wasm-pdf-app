import { LoremIpsum } from 'lorem-ipsum';
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

import('./index.js')
  .then((wasm) => {
    // Change the title to show date (now)
    let doc = {
      title: 'Example Document',
      template: {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50,
      },
      contents: [
        {
          obj_type: 'Paragraph',
          params: {
            text: lorem.generateWords(900),
            font_name: 'Helvetica-Bold',
            font_size: 12,
            align: 'left',
          },
        },
      ],
    };
    document.start1 = new Date();
    wasm.createPDF(doc);
  })
  .catch((e) => console.error('Error importing `index.js`:', e));

import { generate, BLANK_PDF } from '@pdfme/generator';

const template = {
  basePdf: BLANK_PDF,
  schemas: [
    {
      a: {
        type: 'text',
        position: { x: 1, y: 1 },
        width: 210,
        height: 275,
      },
    },
  ],
};
const inputs = [{ a: lorem.generateWords(900) }];

document.start2 = new Date();
generate({ template, inputs }).then((pdf) => {
  const stop2 = new Date();
  let time = (stop2 - document.start2).toString();
  console.log('pdfme: ' + time);

  //   console.log(pdf);

  // Browser
  const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
  window.open(URL.createObjectURL(blob));

  // Node.js
  // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
});

var dd = {
  content: [lorem.generateWords(900)],
};
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

document.start3 = new Date();
const pdfDocGenerator = pdfMake.createPdf(dd);
const stop3 = new Date();
let time = (stop3 - document.start3).toString();
console.log('pdfmake -between: ' + time);
pdfDocGenerator.getDataUrl((dataUrl) => {
  const stop3 = new Date();
  let time = (stop3 - document.start3).toString();
  console.log('pdfmake: ' + time);

  //   const targetElement = document.querySelector('#iframeContainer');
  //   const iframe = document.createElement('iframe');
  //   iframe.src = dataUrl;
  //   targetElement.appendChild(iframe);
});

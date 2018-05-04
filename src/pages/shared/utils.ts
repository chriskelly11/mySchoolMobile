import { MatSnackBarConfig } from '@angular/material';

export const MONTHS_OF_YEAR = [
  {key: '01',  value: 'January'  },
  {key: '02',  value: 'February' },
  {key: '03',  value: 'March'    },
  {key: '04',  value: 'April'    },
  {key: '05',  value: 'May'      },
  {key: '06',  value: 'June'     },
  {key: '07',  value: 'July'     },
  {key: '08',  value: 'August'   },
  {key: '09',  value: 'September'},
  {key: '10',  value: 'October'  },
  {key: '11',  value: 'November' },
  {key: '12',  value: 'December' },
];

export const DAYS_OF_MONTH = Array(31)
  .fill(0)
  .map((x, i) => {
    i += 1;
    if (i < 10) return `0${i}`;
    else return `${i}`;
  });

export const YEARS_TO_DATE = Array(new Date().getFullYear())
  .fill(0)
  .map((x, i) => i + 1)
  .map(x => x.toString())
  .reverse();

export const SCHOOL_YEARS = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate',
  'PhD'
];

export function snackBarAlertConfig(duration: number): MatSnackBarConfig<any> {
  return <MatSnackBarConfig<any>> {
    duration:           duration,
    horizontalPosition: 'right',
    verticalPosition:   'top'
  };
}

export function formatDateMMDDYYYY(date: any): string {
  let month = date.getMonth() + 1;
  let day   = date.getDate();
  let year  = date.getFullYear();

  if (month < 10) month = `0${month}`;
  if (day < 10)   day   = `0${day}`;
  if (year < 10)  year  = `0${year}`;

  return `${month}-${day}-${year}`;
}

export function joinMMDDYYYY(MM: string, DD: string, YYYY: string): string {
  return `${MM}-${DD}-${YYYY}`;
}


export function bytesToMb(bytes: number): number {
  return (bytes / (1024 ** 2));
}

export function dataURItoBlob(dataURI: string): Blob {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  var blob = new Blob([ab], {type: mimeString});
  return blob;
}

export function imageUrlToBlob(url: any, callback?: Function) {
  var img = new Image();

  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = function () {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");
    dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

    callback(dataURItoBlob(dataURL));

  };

  img.src = url;
}

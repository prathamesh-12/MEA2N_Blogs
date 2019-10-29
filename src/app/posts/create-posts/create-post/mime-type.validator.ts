import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

// This is async validator
export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
    const file = <File>(control.value);
    const fileReader = new FileReader();
    let isValid: boolean = false;
    //create self observable
    const fileObs = Observable.create((observer: Observer<{[key: string]: any}>) => {
        fileReader.addEventListener('loadend', () => {
            const u8Arr = new Uint8Array(<ArrayBuffer>(fileReader.result)).subarray(0, 4);
            let header = "";
            for (let iFile = 0; iFile<u8Arr.length; iFile++) {
                header += u8Arr[iFile].toString(16);
            }
            switch(header) {
                case "" : isValid = true;
            }
        });
        fileReader.readAsArrayBuffer(file);
        
    });
}
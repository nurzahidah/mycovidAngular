import { Injectable } from '@angular/core';
import { GlobalConstants } from './GlobalConstants';

@Injectable()
export class GlobalMethods {

    public static getError(error: any) {

        if (error.status != undefined) {
            let status = error.status;
            if (status == '404' && status =='0' && error.message != undefined) {
                return error.message;
            }

            else if (status == '500') {



                if (error.error != undefined) {
                    if (error.error.message != undefined) {
                        let errorMessage = error.error.message;
                        let isCovidBE = GlobalConstants.COVID_APP;
                        let isBEMessage = errorMessage.indexOf(isCovidBE);

                        if (isBEMessage) {
                            return errorMessage;
                        }
                    }

                    return error.error;
                }
            }
        else {
            return error;
        }

    }
    }
}
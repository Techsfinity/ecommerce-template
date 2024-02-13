import {Injectable} from "@angular/core";
import {RestService} from "../rest/rest.service";
import {Observable, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, take} from "rxjs/operators";

@Injectable()
export class FileUploadService {

    constructor(private rest: RestService) { }

    public uploadMultipleFileToCustomEndPoint(files: File[], endPoint: string, parameter: string): Observable<Object> {

        const formData = new FormData();
        files.forEach(file => formData.append(parameter, file));

        return this.rest.post(endPoint, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(catchError(this.errorMessage));

    }// uploadMultipleFileToCustomEndPoint()


    private errorMessage(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }// errorMessage()

}
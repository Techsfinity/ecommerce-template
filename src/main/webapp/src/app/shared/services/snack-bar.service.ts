import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) { }

    public createSnackBarMessage(message: string, action?: string, time?: number) {
        this.snackBar.open(message, action, { duration: time });
    }// createSnackBarMessage()
}
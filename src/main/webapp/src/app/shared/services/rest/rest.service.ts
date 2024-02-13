import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, take} from "rxjs/operators";
import {HateosPagedResponse, ObjectWithLinks} from "./models";

@Injectable()
export class RestService {

  private basePath = environment.basePath;

  constructor(public http: HttpClient) { }

  public get(url: string, httpOptions?: Object): Observable<Object> {
    return this.http.get(this.basePath + url, httpOptions);
  } // get()

  public post(url: string, object: object, httpOptions?: Object): Observable<Object> {
    return this.http.post(this.basePath + url, object, httpOptions);
  } // post()

  public patch(url: string, object: object, httpOptions?: Object): Observable<Object> {
    return this.http.patch(this.basePath + url, object, httpOptions);
  } // patch()


  /***
   * @author Osanda Wedamulla
   *
   * @param url
   * @param modelName
   * @param httpOptions
   */
  public getRemoveEmbedded(url: string, modelName: string, httpOptions?: Object): Observable<Object> {
    return this.get(url, httpOptions).pipe(
        map((res: HateosPagedResponse<Object>) => res._embedded[modelName])
    );
  }// getDataFromHeatoes()

  /**
   *
   * @param modelName
   * @param httpOptions
   */
  public getEntities(modelName: string, httpOptions?: Object): Observable<ObjectWithLinks[]> {
    return this.get(modelName, httpOptions).pipe(
        map((res: HateosPagedResponse<Object>) => res._embedded[modelName])
    );
  }

  /***
   * save a given object that has behaviors of @ObjectWithLinks
   * save the object when a new one update the object when a existing one
   *
   * @author Randika Hapugoda
   * @author Osanda Wedamulla
   *
   * @param item
   */
  public save(item: ObjectWithLinks): Observable<ObjectWithLinks> {
    if (item._links) {
      return this.patchEntity(item);
    } else {
      return this.http.post<ObjectWithLinks>(item._links.self.href, item);
    }
  } // save()

  /***
   * get current state of the exsisting object has behaviors if @ObjectWithLinks
   *
   * @param item
   * @param httpOptions
   */
  public one(item: ObjectWithLinks, httpOptions?: Object) {
    return this.http.get(item._links.self.href, httpOptions);
  }

  /** Patch the given object.*/
  public patchEntity(item: ObjectWithLinks): Observable<ObjectWithLinks> {
    return this.http.patch<ObjectWithLinks>(item._links.self.href, item);
  } // patchEntity

  /**
   * @author Osanda Wedamulla
   *
   * @param {string} url
   * @returns {Observable<Object>}
   */
  public delete(url: string): Observable<Object> {
    return this.http.delete(url);
  }// delete()

  /***
   * patch new entity for one to many relation ship models with
   * modified content type uri/list
   *
   * @param url
   * @param newObjUrl
   */
  public patchList(url:string, newObjUrl?: string): Observable<ObjectWithLinks> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'text/uri-list');
    return this.http.patch<ObjectWithLinks>(url, newObjUrl,{ headers });
  } // patchEntity

  // /**
  //  * delete item with confirmation
  //  *
  //  * @author Osanda Wedamulla
  //  * @param url
  //  */
  // public deleteWithConfirm(url: string): Observable<Object> {
  //
  //   const deleteConfig = new MatDialogConfig();
  //
  //   deleteConfig.disableClose = true;
  //   deleteConfig.autoFocus = true;
  //   deleteConfig.width = '450px';
  //
  //   this.dialog.open(DeleteConfirmComponent, deleteConfig).afterClosed().subscribe(response => {
  //     console.log('Delete Dialog response ', response);
  //
  //     if(response) {
  //       return of(undefined);
  //       //return this.http.delete(url)
  //     } else {
  //       return of(undefined);
  //     }
  //
  //   });
  //
  //   return of(undefined);
  //
  // }// deleteWithConfirm()

  /**
   * get response by find by  query added in data rest repositiry
   *
   * @author Osanda Wedamulla
   *
   * @param url
   * @param findBy
   * @param httpOptions
   */
  public getByFindByQuery(url: string, findBy: string, httpOptions?: Object): Observable<Object> {
    let paramUrl = url + '/search/' + findBy;
    return this.get(paramUrl, httpOptions);
  } // getByFindByQuery()

  public getByFindByQueryRemoveEmbedded(url: string, findBy: string, httpOptions?: Object): Observable<ObjectWithLinks[]> {
    let paramUrl = url + '/search/' + findBy;
    return this.get(paramUrl, httpOptions).pipe(
        map((res: HateosPagedResponse<Object>) => res._embedded[url]));
  } // getByFindByQueryRemoveEmbedded()

  /***
   * get entity primary key form self link
   *
   * @author Osanda Wedamulla
   * @param url
   */
  public getIdFromSelf(url: string) {
    let id;
    if (url != null) {
      let paraStart = url.lastIndexOf("/");
      if (paraStart > 0) {
        id = url.substring(paraStart + 1);
      }
    }
    return id;
  }// getIdFromSelf()
}

import {Injectable} from '@angular/core';
import {RestService} from "../../shared/services/rest/rest.service";
import {take} from "rxjs/operators";
import {Observable} from "rxjs";
import {BasicModel} from "../models/basic-model";
import {Category} from "../models/category";
import {HttpParams} from "@angular/common/http";
import {Product} from "../models/product";
import {JobSave} from "../models/job-save";

export const JOB_ENDPOINT = 'jobs';
export const JOB_TYPE_ENDPOINT = 'jobTypes';
export const JOB_STATUS_ENDPOINT = 'jobStatuses';
export const CATEGORY_ENDPOINT = 'categories';
export const PRODUCT_ENDPOINT = 'products';

export const COMMENT_ENDPOINT = 'comments';

export const JOB_SAVE_ENDPOINT = 'jobs/save';
export const JOB_UPDATE_ENDPOINT = 'jobs/update';

@Injectable()
export class HomeService {

  constructor(public rest: RestService) { }

  /***
   * job related operation
   *
   * @author Osanda Wedamulla
   */
  public getAllJobs(page?: number, size?: number): Observable<Object> {
    let params: HttpParams = new HttpParams();
    params = params.append('sort', 'id,desc');
    params = params.append('projection', 'full');
    params = params.append('active', 'true');

    if(page)
      params = params.append('page', page.toString());

    if(size)
      params = params.append('size', size.toString());

    return this.rest.get(JOB_ENDPOINT, { params }).pipe(take(1));
  }// getAllJobs()

  public saveJob(job: JobSave): Observable<Object> {
    return this.rest.post(JOB_SAVE_ENDPOINT, job).pipe(take(1));
  }// saveJob()

  public updateJobDetails(job: JobSave): Observable<Object> {
    return this.rest.patch(JOB_UPDATE_ENDPOINT, job).pipe(take(1));
  }// updateJobDetails()

  public getAllJobTypes(): Observable<BasicModel[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('active', 'true');

    return this.rest.getEntities(JOB_TYPE_ENDPOINT, { params }).pipe(take(1));
  }// getAllJobTypes()

  public getAllJobStatuses(): Observable<BasicModel[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('active', 'true');

    return this.rest.getEntities(JOB_STATUS_ENDPOINT, { params }).pipe(take(1));
  }// getAllJobStatuses()

  //job operation ends
  
  /***
   * category related operation
   *
   * @author Osanda Wedamulla
   */
  public getAllCategories(): Observable<Category[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('active', 'true');
    params = params.append('size', '50');

    return this.rest.getEntities(CATEGORY_ENDPOINT, { params }).pipe(take(1));
  }//getAllCategories()

  //category operation ends

  /***
   * products related operation
   *
   * @author Osanda Wedamulla
   */
  public getProductsByCategoryName(category: string): Observable<Product[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('sort', 'name,asc');
    params = params.append('category.name', category);

    return this.rest.getEntities(PRODUCT_ENDPOINT, { params }).pipe(take(1));
  }// getProductsByCategoryName()

  public getProductsByNameAndCategoryName(categoryName: string, productName?: string, ): Observable<Product[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('sort', 'name,asc');
    if(productName)
      params = params.append('name', productName);
    if(categoryName)
      params = params.append('category.name', categoryName);

    return this.rest.getEntities(PRODUCT_ENDPOINT, { params }).pipe(take(1));
  }// getProductsByName()

  public createNewProduct(product: Product): Observable<Object> {
    return this.rest.post(PRODUCT_ENDPOINT, product).pipe(take(1));
  }// createNewProduct()

  public getAllProducts(page?: number, size?: number): Observable<Object> {
    let params: HttpParams = new HttpParams();
    params = params.append('sort', 'id,desc');
    params = params.append('active', 'true');
    params = params.append('projection', 'all');

    if(page)
      params = params.append('page', page.toString());

    if(size)
      params = params.append('size', size.toString());

    return this.rest.get(PRODUCT_ENDPOINT, { params }).pipe(take(1));
  }// getAllProducts()

  //product operation ends

}// HomeService {}

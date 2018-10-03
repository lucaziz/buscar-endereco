import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {

    private ABSOLUTEPATH = 'https://viacep.com.br/ws/';
    private APIPATH = 'https://5bb401afdf4be6001447bba5.mockapi.io/';

    private listEnderecos = new Subject<any>();
    listEnderecos$ = this.listEnderecos.asObservable();

    private dataListaEnderecos: Array<any>;
    
    constructor(
        private http: Http
    ) {}

    result(res: any) {
        const response = res.json();
        if (response.result == 'ERROR') {
            throw Observable.throw(response);
        } else {
            return res.json();
        }
    }

    // DETALHES DO CEP
    getCep(cep: number): Observable<any[]> {
        let url: string;
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

        url = cep + '/json/';
        return this.http.get(this.ABSOLUTEPATH + url, options).pipe(map(res => this.result(res)));
    }


    // LIST TASKS
    listarEnderecos(): Observable<any[]> {
        let url: string;
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

        url = 'endereco/';
        return this.http.get(this.APIPATH + url, options).pipe(map((res: any) => {
            this.dataListaEnderecos = res.json();
            this.listEnderecos.next(this.dataListaEnderecos);
            return this.result(res);
        }));
    }

    // SAVE ENDEREÇO
    salvarEndereco(endereco: any): Observable<any[]> {
        let url: string;
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

        url = 'endereco/';
        return this.http.post(this.APIPATH + url, endereco, options).pipe(map(res => {
            this.dataListaEnderecos.push(res.json());
            this.listEnderecos.next(this.dataListaEnderecos);
            return this.result(res);
        }));
    }
    // DELETE ENDEREÇO
    deletarEndereco(id: number): Observable<any[]> {
        let url: string;
        const headers = new Headers({ 'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers });

        url = 'endereco/' + id;
        return this.http.delete(this.APIPATH + url, options).pipe(map(res => {
            this.dataListaEnderecos = this.dataListaEnderecos.filter(res => res.id !== id);
            this.listEnderecos.next(this.dataListaEnderecos);
            return this.result(res);
        }));
    }

}
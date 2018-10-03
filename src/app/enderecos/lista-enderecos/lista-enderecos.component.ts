import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lista-enderecos',
  templateUrl: './lista-enderecos.component.html',
  styleUrls: ['./lista-enderecos.component.scss']
})
export class ListaEnderecosComponent implements OnInit, OnDestroy {

  public listarEnderecos: Array<any>;

  @Input() public loading;

  listSubscription: Subscription;
  public EnderecosDataSource;
  public displayedColumns: string[] = ['cep', 'endereco', 'data', 'acoes'];

  constructor(
    private dataService: DataService
  ) {
    this.listSubscription = this.dataService.listEnderecos$.subscribe(
    res => {
      this.listarEnderecos = res;
      this.EnderecosDataSource = new MatTableDataSource(this.listarEnderecos);
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.listSubscription.unsubscribe();
  }

  deletarEndereco(id: number) {
    this.dataService.deletarEndereco(id).subscribe();
  }
  

}

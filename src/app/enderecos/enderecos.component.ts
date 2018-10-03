import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';

@Component({
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.scss']
})
export class EnderecosComponent implements OnInit {

  public loading: boolean;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loading = true;
    this.dataService.listarEnderecos()
    .subscribe(res => {
      this.loading = false;
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-busca-enderecos',
  templateUrl: './busca-enderecos.component.html',
  styleUrls: ['./busca-enderecos.component.scss']
})
export class BuscaEnderecosComponent implements OnInit {

  public form: FormGroup;
  public subloading: boolean;
  public error: boolean;

  @Input() public loading;

  constructor(
    private _fb: FormBuilder,
    private dataService: DataService
   ) { }

  ngOnInit() {
    this.form = this._fb.group({
      cep: [null],
      data: [null],
      endereco: [null]
  });
  }

  onSubmit() {
    if (this.form.get('cep').value && this.form.get('cep').value.length > 0) {
      this.subloading = true;
      this.error = false;
      const data = new Date();

      this.dataService.getCep(this.form.get('cep').value).subscribe((res: any) => {
        if(!res.erro) {
          const endereco = res.logradouro + ', ' + res.bairro + '. ' + res.localidade + ' - ' + res.uf;
          res['data'] = data;
          res['endereco'] = endereco;
          this.form.get('data').setValue(data);
          this.form.get('endereco').setValue(res.logradouro + ', ' + res.bairro + '. ' + res.localidade + ' - ' + res.uf);
          this.dataService.salvarEndereco(res).subscribe(res2 => {
            console.log('Salvo com sucesso');
          });
        } else {
          this.form.get('cep').setErrors({'incorrect': true});
        }
        this.subloading = false;
      },
      error => {
        this.form.get('cep').setErrors({'invalid': true});
        this.subloading = false;
      });
    }
  }

}

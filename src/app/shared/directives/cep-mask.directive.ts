import { Directive, HostListener, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
 
@Directive({
  selector: '[CepMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR, 
    useExisting: CepMaskDirective, 
    multi: true 
  }]
})
export class CepMaskDirective implements ControlValueAccessor {
 
  onTouched: any;
  onChange: any;
  private cepMask = '99.999-999';
 
  writeValue(value: any): void { }
 
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
 
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
 
  @HostListener('keyup', ['$event']) 
  onKeyup($event: any) {
    let valor = $event.target.value.replace(/\D/g, '');
    const pad = this.cepMask.replace(/\D/g, '').replace(/9/g, '*');
    const valorMask = valor + pad.substring(0, pad.length - valor.length);
    if ($event.keyCode === 8) {
      this.onChange(valor);
      return;
    }
    if (valor.length <= pad.length) {
      this.onChange(valor);
    }
    let valorMaskPos = 0;
    valor = '';
    for (var i = 0; i < this.cepMask.length; i++) {
      if (isNaN(parseInt(this.cepMask.charAt(i)))) {
        valor += this.cepMask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }
    if (valor.indexOf('*') > -1) {
      valor = valor.substr(0, valor.indexOf('*'));
    }
    $event.target.value = valor;
  }
 
  @HostListener('blur', ['$event']) 
  onBlur($event: any) {
    if ($event.target.value.length === this.cepMask.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }
}
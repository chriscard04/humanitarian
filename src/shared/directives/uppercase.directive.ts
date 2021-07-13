import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appUppercase]'
})
export class UppercaseDirective {

    constructor(public ref: ElementRef, private control: NgControl) { }

    @HostListener('input', ['$event']) onEvent(event) {
        const upper = event.target.value.toUpperCase();
        this.control.control.setValue(upper);
    }

}

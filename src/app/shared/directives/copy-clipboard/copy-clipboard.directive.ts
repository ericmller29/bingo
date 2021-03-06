import {
    Directive,
    Input,
    Output,
    HostListener,
    EventEmitter
} from '@angular/core';

@Directive({
    selector: '[appCopyClipboard]'
})
export class CopyClipboardDirective {
    // tslint:disable-next-line: no-input-rename
    @Input('appCopyClipboard')
    public payload: string;

    // tslint:disable-next-line: no-input-rename
    @Input('context')
    public context: string;

    // tslint:disable-next-line: no-output-rename
    @Output('copied')
    public copied: EventEmitter<string> = new EventEmitter<string>();

    @HostListener('click', ['$event'])
    public onClick(event: MouseEvent): void {
        event.preventDefault();

        if (!this.payload) { return; }

        const range = document.createRange();
        range.selectNodeContents(document.body);
        document.getSelection().addRange(range);

        const listener = (e: ClipboardEvent) => {
            // tslint:disable-next-line: no-string-literal
            const clipboard = e.clipboardData || window['clipboardData'];
            clipboard.setData('text', this.payload.toString());
            e.preventDefault();
            this.copied.emit(this.payload);
        };

        document.addEventListener('copy', listener, false)
        document.execCommand('copy');
        document.removeEventListener('copy', listener, false);

        document.getSelection().removeAllRanges();
    }

}

import { Injectable } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  constructor(private clipboard: Clipboard) {}

  copyText(textToCopy: string) {
    const pending = 
    this.clipboard.beginCopy(textToCopy);
let remainingAttempts = 3;
const attempt = () => {
const result = pending.copy();
if (!result && --remainingAttempts) {
setTimeout(attempt);
} else {
// Remember to destroy when you're done!
pending.destroy();
}
};
attempt();
  }

}

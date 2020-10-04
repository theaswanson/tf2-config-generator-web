import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  config: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  getBlobUrl(config: string): string {
    const blob = new Blob([config], { type: 'text' });
    return window.URL.createObjectURL(blob);
  }

  previewConfig(config: string) {
    var url = this.getBlobUrl(config);
    window.open(url);
  }

  downloadConfig(config: string) {
    var url = this.getBlobUrl(config);
    var anchor = document.createElement('a');
    anchor.download = "autoexec.cfg";
    anchor.href = url;
    anchor.click();
  }

}

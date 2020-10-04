import { Component, OnInit } from '@angular/core';
import { Config } from 'protractor';
import { ConfigOption, BoolConfigOption, NumberConfigOption } from '../models/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  config: string = '';
  mouseFilter: BoolConfigOption = { label: 'Mouse Filter', command: 'm_filter', value: false, description: 'Smooth out mouse movement over 2 frames.' };
  rawInput: BoolConfigOption = { label: 'Raw Input', command: 'm_rawinput', value: true, description: 'Raw input reads mouse movement directly from the device, bypassing control panel mouse settings, and providing more reliable mouse movement.' };
  mouseAcceleration: BoolConfigOption = { label: 'Mouse Acceleration', command: 'm_mousespeed', value: false, description: 'Apply acceleration to mouse movement.' };
  mouseSensitivity: NumberConfigOption = {label: 'Mouse Sensitivity', command: 'sensitivity', value: 3, description: 'Mouse sensitivity.'}
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

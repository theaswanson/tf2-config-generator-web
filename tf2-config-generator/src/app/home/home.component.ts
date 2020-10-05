import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Config } from 'protractor';
import { ConfigOption, BoolConfigOption, NumberConfigOption, StringConfigOption } from '../models/config';
import { MatTab, MatTabGroup, MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('previewTab')
  previewTab: MatTabGroup;

  config: string = '';
  mouseSensitivity: NumberConfigOption = {
    label: 'Mouse Sensitivity',
    command: 'sensitivity',
    value: 3,
    min: 0,
    max: 20,
    description: 'The sensitivity of mouse movements.'
  }
  mouseFilter: BoolConfigOption = {
    label: 'Mouse Filter',
    command: 'm_filter',
    value: false,
    description: 'Smooth out mouse movement over 2 frames.'
  };
  rawInput: BoolConfigOption = {
    label: 'Raw Input',
    command: 'm_rawinput',
    value: true,
    description: 'Raw input reads mouse movement directly from the device, bypassing control panel mouse settings, and providing more reliable mouse movement.'
  };
  mouseAcceleration: BoolConfigOption = {
    label: 'Mouse Acceleration',
    command: 'm_mousespeed',
    value: false,
    description: 'Apply acceleration to mouse movement.'
  };
  mouseAccelerationAmount: NumberConfigOption = {
    label: 'Acceleration Amount',
    command: 'm_customaccel_exponent',
    value: 1,
    min: 1,
    max: 1.4,
    description: 'Amount of acceleration.'
  }
  options: ConfigOption[] = [
    this.mouseSensitivity,
    this.mouseFilter,
    this.rawInput,
    this.mouseAcceleration,
    this.mouseAccelerationAmount
  ];

  constructor() { }

  ngOnInit(): void {
  }

  tabChanged(event: any) {
    if (event.tab.textLabel == 'Preview') {
      this.previewConfig();
    }
  }

  renderConfig(): string {
    let config = '';
    this.options.map(option => {
      if (this.isBoolConfigOption(option)) {
        let castedOption = option as BoolConfigOption;
        let value = castedOption.value
          ? (castedOption.command == 'm_mousespeed' ? '3' : '1')
          : '0';
        config += `${castedOption.command} ${value}\n`;
      } else if (this.isStringConfigOption(option)) {
        let castedOption = option as StringConfigOption;
        config += `${castedOption.command} ${castedOption.value}\n`;
      } else if (this.isNumberConfigOption(option)) {
        let castedOption = option as NumberConfigOption;
        config += `${castedOption.command} ${Number(castedOption.value)}\n`;
      }
    });
    return config;
  }

  isBoolConfigOption(option: ConfigOption): option is BoolConfigOption {
    var castedOption = (option as BoolConfigOption);
    return typeof (castedOption.value) == 'boolean' ? true : false;
  }

  isStringConfigOption(option: ConfigOption): option is StringConfigOption {
    var castedOption = (option as StringConfigOption);
    return typeof (castedOption.value) == 'string' ? true : false;
  }

  isNumberConfigOption(option: ConfigOption): option is NumberConfigOption {
    var castedOption = (option as NumberConfigOption);
    return typeof (castedOption.value) == 'number' ? true : false;
  }

  getBlobUrl(config: string): string {
    const blob = new Blob([config], { type: 'text' });
    return window.URL.createObjectURL(blob);
  }

  viewConfig(config: string) {
    var url = this.getBlobUrl(config);
    window.open(url);
  }

  previewConfig() {
    this.config = this.renderConfig();
  }

  downloadConfig(config: string) {
    var url = this.getBlobUrl(config);
    var anchor = document.createElement('a');
    anchor.download = "autoexec.cfg";
    anchor.href = url;
    anchor.click();
  }

}

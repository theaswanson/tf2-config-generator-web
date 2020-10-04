export interface Config {
  name: string;
  config: ConfigOption[]
}

export interface ConfigOption {
  label: string;
  command: string;
  description: string;
}

export interface BoolConfigOption extends ConfigOption {
  value: boolean;
}

export interface StringConfigOption extends ConfigOption {
  value: string;
}

export interface NumberConfigOption extends ConfigOption {
  value: Number;
}
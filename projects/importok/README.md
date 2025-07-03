# importOK Angular Component

This is a Angular component for [importOK](https://importok.io/).

## Installation

```
npm install --save @importok/javascript
npm install --save @importok/angular
```

## Usage

```angular
import { Component } from '@angular/core';
import { ImportokWizardComponent } from '@importok/angular';
import { ImportConfigFields, ImportConfigValidators, ImportConfigTransformers } from '@importok/javascript';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ImportokWizardComponent],
  template: `<importok-wizard
    title="Importok Angular Example"
    [fields]="fields"
    [recordReady]="saveRecord"
  />`
})
export class AppComponent {
  /**
   * Import fields to be mapped
   * Check https://importok.io/docs/fields for more details
   */
  public fields: ImportConfigFields = {
    first_name: {
      label: 'First Name',
      description: 'The first name of the person',
    },
  };

  /**
   * Push the provided record to the API
   * Check https://importok.io/docs/webhooks for more details
   */
  public async saveRecord(record: any, meta: any): Promise<void> {
    await fetch('https://example.com/api/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        record,
        meta,
      }),
    });
  };

  /**
   * Custom transformers
   * Check https://importok.io/docs/custom-transformers for more details
   */
  public transformers: ImportConfigTransformers = {};

  /**
   * Custom validators
   * Check https://importok.io/docs/custom-validators for more details
   */
  public validators: ImportConfigValidators = {};
}
```

[Learn more →](https://importok.io/docs/angular)

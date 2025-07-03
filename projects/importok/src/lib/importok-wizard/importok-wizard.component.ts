import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import ImportOK, { ImportConfigDataProviders, ImportConfigEditorMode, ImportConfigFields, ImportConfigTransformers, ImportConfigTranslations, ImportConfigValidators, ImportRecord, MapperStrategy } from '@importok/javascript';

@Component({
  selector: 'importok-wizard',
  standalone: true,
  imports: [],
  template: '<div class="ImportokWizardWrapper" #elementRef></div>',
})
export class ImportokWizardComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() public title: string = ImportOK.getDefaults().title;
  @Input() public subtitles: string[] = ImportOK.getDefaults().subtitles;
  @Input() public fields: ImportConfigFields = ImportOK.getDefaults().fields;
  @Input() public transformers: ImportConfigTransformers = ImportOK.getDefaults().transformers;
  @Input() public validators: ImportConfigValidators = ImportOK.getDefaults().validators;
  @Input() public providers: ImportConfigDataProviders = ImportOK.getDefaults().providers;
  @Input() public mapper?: MapperStrategy = ImportOK.getDefaults().mapper;
  @Input() public editorMode?: ImportConfigEditorMode = ImportOK.getDefaults().editorMode;
  @Input() public style?: string = ImportOK.getDefaults().style;
  @Input() public locale?: string = ImportOK.getDefaults().locale;
  @Input() public translations?: ImportConfigTranslations = ImportOK.getDefaults().translations;
  @Input() public uploadedFile?: File = ImportOK.getDefaults().uploadedFile;
  @Input() public throttle?: false | number = ImportOK.getDefaults().throttle;
  @Input() public meta: any = ImportOK.getDefaults().meta;

  @Input() recordReady?: (record: ImportRecord, meta: object) => Promise<void>;
  @Input() importReady?: (records: ImportRecord[], meta: object) => Promise<void>;

  @Output() importProgress = new EventEmitter<{
    processed: number;
    failed: number;
    total: number;
  }>();

  @Output() stepEnter = new EventEmitter<{
    step: number;
    previousStep: number;
  }>();

  @Output() stepExit = new EventEmitter<{
    step: number;
    nextStep: number;
  }>();

  @ViewChild('elementRef', { static: true }) elementRef!: ElementRef;

  private wizard: any;

  ngOnInit(): void {
    ImportOK.defineCustomElements();
  }

  ngAfterViewInit(): void {
    this.wizard = ImportOK.add(this.elementRef.nativeElement, {
      title: this.title,
      subtitles: this.subtitles,
      fields: this.fields,
      transformers: this.transformers,
      validators: this.validators,
      providers: this.providers,
      mapper: this.mapper,
      editorMode: this.editorMode,
      style: this.style,
      locale: this.locale,
      translations: this.translations,
      uploadedFile: this.uploadedFile,
      throttle: this.throttle,
      meta: this.meta,
      onRecordReady: this.recordReady,
      onImportReady: this.importReady,
      onImportProgress: (progress: { processed: number; failed: number; total: number }) => {
        this.importProgress.emit(progress);
      },
      onStepEnter: (step: { step: number; previousStep: number }) => {
        this.stepEnter.emit(step);
      },
      onStepExit: (step: { step: number; nextStep: number }) => {
        this.stepExit.emit(step);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.wizard) {
      this.wizard.destroy();
      this.wizard = undefined;
    }
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

// install @angular/elements and import createCustomElement
import { createCustomElement } from '@angular/elements';
import { NgElementComponent } from './ng-element/ng-element.component';

// install and import for our mock database
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// config from Angualr firebase sample database
const dbConfig = {
  apiKey: 'AIzaSyBfydW5dYxD9P8NH0fR2qcyAxGvxX0ANUE',
  authDomain: 'angular-element.firebaseapp.com',
  databaseURL: 'https://angular-element.firebaseio.com',
  projectId: 'angular-element',
  storageBucket: 'angular-element.appspot.com',
  messagingSenderId: '671946156215'
};

@NgModule({
  declarations: [NgElementComponent],
  imports: [
    BrowserModule,
    // import AFM and initialize the database config
    AngularFireModule.initializeApp(dbConfig),
    AngularFirestoreModule
  ],
  providers: [],
  // entryComponent let angular know this module will use this component
  // even it is not used with in another component
  entryComponents: [NgElementComponent]
})
export class AppModule {
  constructor(private inj: Injector) {}

  ngDoBootstrap() {
    // encasulate in a constant which component to be used to in creating custom element
    // then the injector
    const custEl = createCustomElement(NgElementComponent, {
      injector: this.inj
    });

    // customElements is pure Javascript function, 2 argument is required
    // 'sample-poll' will be the custom tag for our Custom element
    // then refer 2nd arg to custEl constant
    customElements.define('sample-poll', custEl);
  }
}

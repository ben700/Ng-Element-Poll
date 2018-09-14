import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestore
} from 'angularfire2/firestore';

@Component({
  selector: 'app-ng-element',
  templateUrl: './ng-element.component.html',
  styleUrls: ['./ng-element.component.scss'],
  // this will enable us to port the implemented bootstrap design
  // for our component
  encapsulation: ViewEncapsulation.Native
})
export class NgElementComponent implements OnInit {
  // variables for the poll
  ngVote: number;
  vueVote: number;
  ionVote: number;

  // checkers for our poll, given default false value
  hasVoted = false;
  loading = false;

  // reference to the mock database
  dbRef: AngularFirestoreDocument<any>;

  // this will serve as a service for our mock database
  constructor(private dbService: AngularFirestore) {}

  ngOnInit() {
    // retrieve our mock database
    this.dbRef = this.dbService.doc('first_poll/1');
    // subscribe to db changes, if changes, then execute callback
    this.dbRef.valueChanges().subscribe(doc => {
      this.ngVote = doc.angular_vote;
      this.vueVote = doc.vue_vote;
      this.ionVote = doc.ionic_vote;
    });
  }
}
